function qs<T extends Element = Element>(sel: string, root: ParentNode = document): T | null {
  return root.querySelector(sel) as T | null;
}

const form = qs<HTMLFormElement>('#notify-form');
const banner = qs<HTMLDivElement>('#banner');

function showBanner(msg: string, kind: 'success' | 'error' = 'success') {
  if (!banner) return;
  banner.textContent = msg;
  banner.className = `warning-banner show ${kind}`;
}

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = qs<HTMLInputElement>('input[name="email"]', form);
    const formName = (qs<HTMLInputElement>('input[name="form-name"]', form)?.value ?? 'notify');

    const email = emailInput?.value.trim() ?? '';
    if (!email) {
      showBanner('Please enter an email address.', 'error');
      return;
    }

    try {
      const body = encode({ 'form-name': formName, email });

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (res.ok) {
        form.reset();
        showBanner("You’re on the list! 🎉", 'success');
      } else {
        showBanner('Something went wrong. Please try again.', 'error');
      }
    } catch {
      showBanner('Network error. Please try again.', 'error');
    }
  });
}