type Translation = {
  lang: string;
  code: string;
  heading: string;
  email: string;
  notify: string;
  dir?: 'ltr' | 'rtl';  /// Direction (Arabic = rtl) \\\
};

///  Popular languages (rotation order)  \\\
const translations: Translation[] = [
  { lang: 'English',    code: 'en',      heading: 'Be the first to know',      email: 'Email',               notify: 'Notify me' },
  { lang: 'Español',    code: 'es',      heading: 'Sé el primero en saber',    email: 'Correo',              notify: 'Avísame' },
  { lang: 'Français',   code: 'fr',      heading: 'Soyez le premier informé',  email: 'Email',               notify: 'Prévenez-moi' },
  { lang: 'Deutsch',    code: 'de',      heading: 'Erfahre es als Erster',     email: 'Email',               notify: 'Benachrichtigen' },
  { lang: 'Português',  code: 'pt',      heading: 'Seja o primeiro a saber',   email: 'Email',               notify: 'Avisar-me' },
  { lang: 'Italiano',   code: 'it',      heading: 'Sii il primo a saperlo',    email: 'Email',               notify: 'Avvisami' },
  { lang: '中文 (简体)', code: 'zh-Hans', heading: '抢先知晓最新消息',           email: '邮箱',                notify: '通知我' },
  { lang: '日本語',      code: 'ja',      heading: '最新情報をいち早く入手',      email: 'メール',              notify: '通知する' },
  { lang: '한국어',      code: 'ko',      heading: '가장 먼저 소식을 받아보세요', email: '이메일',              notify: '알림 받기' },
  { lang: 'हिन्दी',        code: 'hi',      heading: 'सबसे पहले जानें',             email: 'ईमेल',                 notify: 'मुझे सूचित करें' },
  { lang: 'العربية',    code: 'ar',      heading: 'كن أول من يعرف',           email: 'البريد الإلكتروني',  notify: 'أبلغني', dir: 'rtl' },
  { lang: 'Русский',    code: 'ru',       heading: 'Узнайте первыми',           email: 'Эл. почта',          notify: 'Уведомить меня' },
];

(function setupLanguageRotation() {
  const emailInput   = document.getElementById('email') as HTMLInputElement | null;
  const emailLabel   = document.getElementById('i18n-email-label');
  const submitButton = document.getElementById('i18n-submit');
  const langChip     = document.getElementById('i18n-lang');
  const headingEl    = document.getElementById('i18n-heading');
  const htmlEl       = document.documentElement;

  if (!emailLabel || !submitButton || !headingEl) return;

  let idx = 0;
  let timer: number | null = null;

  const apply = (t: Translation) => {
    htmlEl.setAttribute('lang', t.code);
    htmlEl.setAttribute('dir', t.dir ?? 'ltr');

    headingEl.textContent   = t.heading;
    emailLabel.textContent  = t.email;
    submitButton.textContent = t.notify;
    if (langChip) langChip.textContent = t.lang;
  };

  const next = () => {
    idx = (idx + 1) % translations.length;
    apply(translations[idx]);
  };

  const start = () => { if (timer == null) timer = window.setInterval(next, 3000); };
  const stop  = () => { if (timer != null) { window.clearInterval(timer); timer = null; } };

  ///  Start in englush and cycles from there  \\\
  apply(translations[0]);
  start();

  ///  Pause while the user interacts or is typing  \\\
  const shouldPause = () => !!emailInput?.matches(':focus') || !!emailInput?.value.trim();

  emailInput?.addEventListener('focus', stop, { passive: true });
  emailInput?.addEventListener('blur', () => { if (!shouldPause()) start(); }, { passive: true });
  emailInput?.addEventListener('input', () => { if (shouldPause()) stop(); else start(); });
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