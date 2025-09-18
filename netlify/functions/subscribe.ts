import type { Handler } from '@netlify/functions';
import crypto from 'node:crypto';

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
    // Try to use your explicit env vars first; fall back to Netlify’s auto var
    const siteID =
      process.env.NETLIFY_BLOBS_SITE_ID ||
      process.env.NETLIFY_SITE_ID || // Netlify usually injects this automatically
      '';

    const token = process.env.NETLIFY_BLOBS_TOKEN || '';

    // Dynamic import to get around strict TS types in v10
    const blobs = await import('@netlify/blobs');

    // getStore(name, { siteID, token }) works at runtime on v10, but the types don’t admit it.
    // We intentionally cast to any to pass the second arg.
    const getStore = (blobs as any).getStore as (name: string, opts?: { siteID?: string; token?: string }) => any;

    const store =
      token
        ? getStore(BUCKET, { siteID, token }) // manual config path
        : getStore(BUCKET);                    // auto-config path (requires Blobs enabled on the site)

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
    // Helpful diagnostics while wiring everything up
    return json(
      {
        error: 'Server error',
        message: String(err?.message || err),
        haveToken: !!process.env.NETLIFY_BLOBS_TOKEN,
        haveExplicitSiteID: !!process.env.NETLIFY_BLOBS_SITE_ID,
        haveAutoSiteID: !!process.env.NETLIFY_SITE_ID,
      },
      500
    );
  }
};