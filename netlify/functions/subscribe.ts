import type { Handler } from '@netlify/functions';
import crypto from 'node:crypto';
import { getStore as _getStore } from '@netlify/blobs';

const BUCKET = 'emails';

function hashEmail(email: string) {
  return crypto
    .createHash('sha256')
    .update(email.trim().toLowerCase())
    .digest('hex');
}

const json = (obj: unknown, statusCode = 200) => ({
  statusCode,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(obj),
});

export const handler: Handler = async (event) => {
  try {
    // If Blobs isn't auto-configured for your site, supply creds manually
    const siteID =
      process.env.NETLIFY_BLOBS_SITE_ID ||
      process.env.NETLIFY_SITE_ID ||
      '';
    const token =
      process.env.NETLIFY_BLOBS_TOKEN ||
      process.env.NETLIFY_API_TOKEN ||
      '';

    // v10's types don't declare the second argument, but the runtime supports it.
    // So we cast to any to pass {siteID, token} in manual mode.
    const getStore = _getStore as unknown as (
      name: string,
      opts?: { siteID?: string; token?: string }
    ) => {
      get: (key: string) => Promise<string | null>;
      set: (key: string, val: string) => Promise<void>;
    };

    const store =
      siteID && token ? getStore(BUCKET, { siteID, token }) : getStore(BUCKET);

    if (event.httpMethod === 'GET') {
      const email = (event.queryStringParameters?.email ?? '').toString();
      if (!email) return json({ error: 'Email required' }, 400);

      const key = hashEmail(email);
      const existing = await store.get(key); // string | null
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
  } catch (err: any) {
    console.error('subscribe error:', err);
    return json(
      { error: 'Server error', reason: String(err?.message || err) },
      500
    );
  }
};