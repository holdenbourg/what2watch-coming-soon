type Translation = {
  lang: string;
  code: string;
  email: string;
  notify: string;
  dir?: 'ltr' | 'rtl';  /// Direction (Arabic = rtl) \\\
};

///  Popular languages (rotation order)  \\\
const translations: Translation[] = [
  { lang: 'English', code: 'en', email: 'Email', notify: 'Notify me' },
  { lang: 'Español', code: 'es', email: 'Correo', notify: 'Avísame' },
  { lang: 'Français', code: 'fr', email: 'E-mail', notify: 'Prévenez-moi' },
  { lang: 'Deutsch', code: 'de', email: 'E-Mail', notify: 'Benachrichtigen' },
  { lang: 'Português', code: 'pt', email: 'E-mail', notify: 'Avisar-me' },
  { lang: 'Italiano', code: 'it', email: 'Email', notify: 'Avvisami' },
  { lang: '中文 (简体)', code: 'zh-Hans', email: '邮箱', notify: '通知我' },
  { lang: '日本語', code: 'ja', email: 'メール', notify: '通知する' },
  { lang: '한국어', code: 'ko', email: '이메일', notify: '알림 받기' },
  { lang: 'हिन्दी', code: 'hi', email: 'ईमेल', notify: 'मुझे सूचित करें' },
  { lang: 'العربية', code: 'ar', email: 'البريد الإلكتروني', notify: 'أبلغني', dir: 'rtl' },
  { lang: 'Русский', code: 'ru', email: 'Эл. почта', notify: 'Уведомить меня' },
];

(function setupLanguageRotation() {
  const emailInput   = document.getElementById('email') as HTMLInputElement | null;
  const emailLabel   = document.getElementById('i18n-email-label');
  const submitButton = document.getElementById('i18n-submit');
  const langChip     = document.getElementById('i18n-lang');
  const htmlEl       = document.documentElement;

  if (!emailLabel || !submitButton) return;

  let idx = 0;
  let timer: number | null = null;

  const apply = (t: Translation) => {
    ///  Flip direction for rtl languages (e.g., Arabic)  \\\
    htmlEl.setAttribute('lang', t.code);
    htmlEl.setAttribute('dir', t.dir ?? 'ltr');

    ///  Swap visible strings  \\\
    emailLabel.textContent = t.email;
    submitButton.textContent = t.notify;
    if (langChip) langChip.textContent = t.lang;
  };

  const next = () => {
    idx = (idx + 1) % translations.length;
    apply(translations[idx]);
  };

  const start = () => {
    if (timer !== null) return;
    timer = window.setInterval(next, 3000);
  };

  const stop = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  ///  Start with English, then rotate  \\\
  apply(translations[0]);
  start();

  ///  Pause while the user is interacting or once they start typing  \\\
  const shouldPause = () => !!emailInput?.matches(':focus') || !!emailInput?.value.trim();

  emailInput?.addEventListener('focus', stop, { passive: true });
  emailInput?.addEventListener('blur', () => { if (!shouldPause()) start(); }, { passive: true });
  emailInput?.addEventListener('input', () => {
    if (shouldPause()) stop(); else start();
  });
})();

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
        showBanner("You are now on the list!", 'success');
      } else {
        showBanner('Something went wrong. Please try again.', 'error');
      }
    } catch {
      showBanner('Network error. Please try again.', 'error');
    }
  });
}