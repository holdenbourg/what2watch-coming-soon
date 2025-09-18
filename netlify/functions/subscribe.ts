// netlify/functions/subscribe.ts
import type { Handler } from '@netlify/functions';

const json = (obj: unknown, status = 200) => ({
  statusCode: status,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(obj),
});

// We’ll prefer `notify`, but keep `subscribe` as a fallback just in case.
const FORM_NAMES = ['notify', 'subscribe'];

async function getFormIds(token: string, siteId: string): Promise<string[]> {
  const r = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return [];
  const forms = (await r.json()) as Array<{ id: string; name: string }>;
  return forms.filter(f => FORM_NAMES.includes(f.name)).map(f => f.id);
}

async function isDuplicateEmail(token: string, formIds: string[], email: string): Promise<boolean> {
  const emailNorm = email.trim().toLowerCase();
  for (const id of formIds) {
    const r = await fetch(
      `https://api.netlify.com/api/v1/forms/${id}/submissions?per_page=1000`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!r.ok) continue;
    const subs = (await r.json()) as Array<{ data?: Record<string, any> }>;
    if (subs.some(s => (s.data?.email || '').toString().trim().toLowerCase() === emailNorm)) {
      return true;
    }
  }
  return false;
}

export const handler: Handler = async (event) => {
  try {
    const token =
      process.env.NETLIFY_BLOBS_TOKEN || '';
    const siteId =
      process.env.NETLIFY_SITE_ID ||
      process.env.NETLIFY_BLOBS_SITE_ID || '';

    if (!siteId) return json({ error: 'Server error', reason: 'Missing NETLIFY_SITE_ID' }, 500);
    if (!token)  return json({ error: 'Server error', reason: 'Missing NETLIFY_API_TOKEN' }, 500);

    const formIds = await getFormIds(token, siteId);
    if (formIds.length === 0) {
      return json({ error: 'Server error', reason: 'No matching forms (notify/subscribe) found' }, 500);
    }

    if (event.httpMethod === 'GET') {
      const email = (event.queryStringParameters?.email ?? '').toString().trim().toLowerCase();
      if (!email) return json({ error: 'Email required' }, 400);
      const duplicate = await isDuplicateEmail(token, formIds, email);
      return json({ duplicate });
    }

    if (event.httpMethod === 'POST') {
      let email = '';
      try {
        const parsed = JSON.parse(event.body || '{}');
        email = (parsed?.email ?? '').toString().trim().toLowerCase();
      } catch {
        return json({ error: 'Invalid JSON' }, 400);
      }
      if (!email) return json({ error: 'Email required' }, 400);

      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!re.test(email)) return json({ error: 'Invalid email' }, 400);

      if (await isDuplicateEmail(token, formIds, email)) {
        return json({ duplicate: true });
      }

      const siteURL =
        process.env.URL ||
        process.env.DEPLOY_PRIME_URL ||
        process.env.DEPLOY_URL || '';
      if (!siteURL) return json({ error: 'Server error', reason: 'Missing site URL' }, 500);

      // Post to the `notify` form so new entries land there
      const body = new URLSearchParams();
      body.set('form-name', 'notify');
      body.set('email', email);
      body.set('bot-field', '');

      const resp = await fetch(siteURL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!resp.ok) return json({ error: 'Submit failed', status: resp.status }, 500);

      return json({ ok: true });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (err: any) {
    return json({ error: 'Server error', reason: String(err?.message || err) }, 500);
  }
};