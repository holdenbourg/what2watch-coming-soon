import type { Handler } from '@netlify/functions';
import crypto from 'crypto';

const BUCKET = 'emails';

function hashEmail(email: string) {
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

const json = (obj: unknown, statusCode = 200) => ({
  statusCode,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(obj),
});

export const handler: Handler = async (event) => {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore(BUCKET);

    if (event.httpMethod === 'GET') {
      const email = (event.queryStringParameters?.email ?? '').toString();
      if (!email) return json({ error: 'Email required' }, 400);

      const key = hashEmail(email);
      const existing = await store.get(key);
      
      return json({ duplicate: !!existing });
    }

    if (event.httpMethod === 'POST') {
      let email = '';

      try {
        const parsed = JSON.parse(event.body || '{}');
        email = (parsed?.email ?? '').toString();
      } catch {
        return json({ error: 'Invalid JSON' }, 400);
      }

      if (!email) return json({ error: 'Email required' }, 400);

      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!re.test(email)) return json({ error: 'Invalid email' }, 400);

      const key = hashEmail(email);

      const existing = await store.get(key);
      if (existing) return json({ duplicate: true });

      await store.set(key, JSON.stringify({ ts: Date.now() }));

      return json({ ok: true });
    }

    return json({ error: 'Method not allowed' }, 405);

  } catch (err) {
    return json({ error: 'Server error' }, 500);
  }
};