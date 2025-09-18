import type { Handler } from '@netlify/functions';

// Helpers
const json = (obj: unknown, status = 200) => ({
  statusCode: status,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(obj),
});

// Find the Netlify form ID for "subscribe"
async function getSubscribeFormId(token: string, siteId: string): Promise<string | null> {
  const r = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return null;
  const forms = await r.json() as Array<{ id: string; name: string }>;
  const match = forms.find(f => f.name === 'subscribe');
  return match?.id || null;
}

// Check duplicates by scanning submissions (you can paginate later if needed)
async function isDuplicateEmail(token: string, formId: string, email: string): Promise<boolean> {
  const r = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions?per_page=1000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return false;
  const subs = await r.json() as Array<{ data?: Record<string, any> }>;
  // Netlify normalizes fields into `data`
  return subs.some(s => (s.data?.email || '').toString().trim().toLowerCase() === email);
}

export const handler: Handler = async (event, context) => {
  try {
    const token = process.env.NETLIFY_BLOBS_TOKEN || '';
    const siteId =
      process.env.NETLIFY_SITE_ID || // auto-injected by Netlify
      process.env.NETLIFY_BLOBS_SITE_ID || // if you had set it
      '';

    if (!siteId) {
      return json({ error: 'Server error', reason: 'Missing NETLIFY_SITE_ID in env' }, 500);
    }
    if (!token) {
      return json({ error: 'Server error', reason: 'Missing NETLIFY_API_TOKEN in env' }, 500);
    }

    const formId = await getSubscribeFormId(token, siteId);
    if (!formId) {
      return json({ error: 'Server error', reason: 'Form "subscribe" not found for this site' }, 500);
    }

    if (event.httpMethod === 'GET') {
      const email = (event.queryStringParameters?.email ?? '').toString().trim().toLowerCase();
      if (!email) return json({ error: 'Email required' }, 400);

      const duplicate = await isDuplicateEmail(token, formId, email);
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

      const duplicate = await isDuplicateEmail(token, formId, email);
      if (duplicate) return json({ duplicate: true });

      // Submit to your own site root; Netlify Forms will capture it
      const siteURL =
        process.env.URL ||           // Netlify production URL
        process.env.DEPLOY_PRIME_URL || // Preview/branch URL
        process.env.DEPLOY_URL || '';   // Fallback
      if (!siteURL) {
        return json({ error: 'Server error', reason: 'Missing site URL in env' }, 500);
      }

      const body = new URLSearchParams();
      body.set('form-name', 'subscribe');
      body.set('email', email);
      body.set('bot-field', ''); // honeypot empty

      const resp = await fetch(siteURL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      // Netlify returns HTML for the page, but the side-effect is what we want.
      if (!resp.ok) {
        return json({ error: 'Submit failed', status: resp.status }, 500);
      }

      return json({ ok: true });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (err: any) {
    return json({ error: 'Server error', reason: String(err?.message || err) }, 500);
  }
};