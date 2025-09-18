import type { Handler } from '@netlify/functions';
import crypto from 'node:crypto';

// ---- Blobs v10.x: configure() + getStore(bucket) ----
import { getStore, configure } from '@netlify/blobs';

// Name anything you like
const BUCKET = 'emails';

function hashEmail(email: string) {
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

const json = (obj: unknown, status = 200) => ({
  statusCode: status,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(obj),
});

export const handler: Handler = async (event) => {
  try {
    // If your site isn't auto-configured for Blobs, configure it manually.
    // These must be set in Netlify → Site settings → Build & deploy → Environment → Environment variables
    const siteID = process.env.NETLIFY_BLOBS_SITE_ID;
    const token  = process.env.NETLIFY_BLOBS_TOKEN;

    if (siteID && token) {
      // configure() is the correct way on v10.x
      configure({ siteID, token });
    }

    const store = getStore(BUCKET);

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

      // sanity regex
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
    // Helpful diagnostics while we’re wiring things up
    return json({
      error: 'Server error',
      message: String(err?.message || err),
      // Seeing these on a live call helps confirm the env vars are present
      haveSiteID: !!process.env.NETLIFY_BLOBS_SITE_ID,
      haveToken:  !!process.env.NETLIFY_BLOBS_TOKEN,
    }, 500);
  }
};