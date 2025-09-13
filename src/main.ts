type Translation = {
  code: string; dir?: 'ltr' | 'rtl';  /// Direction (Arabic = rtl) \\\
  lang: string;
  heading: string;
  email: string;
  notify: string;
  errors: {
    required: string;
    invalid: string;
  };
  success: string;
};

///  Popular languages (rotation order)  \\\
const translations: Translation[] = [
  { code:'en', 
    dir:'ltr', 
    lang:'English',
    heading:'Be the first to know', 
    email:'Email',
    notify:'Notify me',
    errors:{ required:'Please enter your email', invalid:'Enter a valid email address' },
    success:"Thanks! We'll notify you." 
  },
  { code:'es', 
    dir:'ltr', 
    lang:'Español',
    heading:'Sé el primero en saberlo', 
    email:'Correo electrónico', 
    notify:'Avisarme',
    errors:{ required:'Por favor ingresa tu correo', invalid:'Ingresa un correo válido' },
    success:'¡Gracias! Te avisaremos.'
  },
  { code:'fr', 
    dir:'ltr', 
    lang:'Français',
    heading:'Soyez le premier informé', 
    email:'Email', 
    notify:'Prévenez-moi',
    errors:{ required:"Veuillez saisir votre email", invalid:"Entrez une adresse email valide" },
    success:"Merci ! Nous vous préviendrons." 
  },
  { code:'de', 
    dir:'ltr', 
    lang:'Deutsch',
    heading:'Erfahre es als Erste*r', 
    email:'Email', 
    notify:'Benachrichtige mich',
    errors:{ required:'Bitte email eingeben', invalid:'Gib eine gültige email ein' },
    success:'Danke! Wir benachrichtigen dich.' 
  },
  { code:'pt', 
    dir:'ltr', 
    lang:'Português',
    heading:'Seja o primeiro a saber', 
    email:'Email', 
    notify:'Avisar-me',
    errors:{ required:'Digite seu email', invalid:'Digite um email válido' },
    success:'Obrigado! Avisaremos você.' 
  },
  { code:'it', 
    dir:'ltr', 
    lang:'Italiano',
    heading:'Sii il primo a saperlo', 
    email:'Email', 
    notify:'Avvisami',
    errors:{ required:'Inserisci la tua email', invalid:'Inserisci un indirizzo email valido' },
    success:'Grazie! Ti avviseremo.' 
  },
  { code:'ja', 
    dir:'ltr', 
    lang:'日本語',
    heading:'最新情報をいち早く受け取る', 
    email:'メール', 
    notify:'通知を受け取る',
    errors:{ required:'メールアドレスを入力してください', invalid:'有効なメールアドレスを入力してください' },
    success:'ありがとうございます。通知します。' 
  },
  { code:'ko', 
    dir:'ltr', 
    lang:'한국어',
    heading:'가장 먼저 소식을 받아보세요', 
    email:'이메일', 
    notify:'알림 받기',
    errors:{ required:'이메일을 입력하세요', invalid:'유효한 이메일을 입력하세요' },
    success:'감사합니다! 알려드릴게요.' 
  },
  { code:'zh', 
    dir:'ltr', 
    lang:'中文',
    heading:'第一时间获取消息', 
    email:'邮箱', 
    notify:'通知我',
    errors:{ required:'请输入邮箱', invalid:'请输入有效的邮箱地址' },
    success:'谢谢！我们会通知你。' 
  },
  { code:'ar', 
    dir:'rtl', 
    lang:'العربية',
    heading:'كن أول من يعرف', 
    email:'البريد الإلكتروني', 
    notify:'أبلغني',
    errors:{ required:'يرجى إدخال بريدك الإلكتروني', invalid:'أدخل بريدًا إلكترونيًا صالحًا' },
    success:'شكرًا لك! سنخطرك.' 
  }
];

(function setupLanguageRotationAndValidation() {
  const htmlEl       = document.documentElement;
  const headingEl    = document.getElementById('i18n-heading')!;
  const emailLabel   = document.getElementById('i18n-email-label')!;
  const submitButton = document.getElementById('i18n-submit') as HTMLButtonElement;
  const langChip     = document.getElementById('i18n-lang')!;
  const emailInput   = document.getElementById('email') as HTMLInputElement | null;

  // Ensure base class for layering (helps absolute clone positioning)
  [headingEl, emailLabel, submitButton, langChip].forEach(el => {
    el.classList.add('i18n-fade');
    const style = getComputedStyle(el);
    if (style.position === 'static') el.style.position = 'relative';
  });

  let idx = 0;
  let timer: number | null = null;
  let messageTimer: number | null = null;

  const emailMessageEl = ensureMessageEl();

  function ensureMessageEl(): HTMLElement {
    const id = 'email-message';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'form-message';
      // Insert right after the input-box (or after input if you prefer)
      // Try to find the wrapper .input-box to keep spacing consistent
      const inputBox = emailInput?.closest('.input-box');
      (inputBox ?? emailInput?.parentElement ?? document.body).insertAdjacentElement('afterend', el);
    }
    return el as HTMLElement;
    }

  const applyTexts = (t: Translation) => {
    htmlEl.setAttribute('lang', t.code);
    htmlEl.setAttribute('dir', t.dir ?? 'ltr');
    headingEl.textContent     = t.heading;
    emailLabel.textContent    = t.email;
    submitButton.textContent  = t.notify;
    langChip.textContent      = t.lang;
  };

  // Cross-fade one element’s text content to "nextText"
  function crossFadeEl(el: HTMLElement, nextText: string) {
    const clone = el.cloneNode(true) as HTMLElement;
    clone.classList.add('i18n-clone');
    clone.style.opacity = '0';
    clone.textContent = nextText;

    // lock size to avoid layout jitter (optional but helps)
    const rect = el.getBoundingClientRect();
    el.style.minWidth = rect.width + 'px';
    el.style.minHeight = rect.height + 'px';

    el.appendChild(clone);

    // animate: new in, old out
    requestAnimationFrame(() => {
      clone.style.opacity = '1';
      el.style.opacity = '0';
    });

    // after transition, commit text and cleanup
    const duration = 600; // keep in sync with CSS
    setTimeout(() => {
      el.textContent = nextText;
      el.style.opacity = '1';
      el.removeChild(clone);
      // allow size to readjust to new language length
      el.style.minWidth = '';
      el.style.minHeight = '';
    }, duration);
  }

  // Cross-fade all texts to the target translation
  function crossFadeAll(t: Translation) {
    htmlEl.setAttribute('dir', t.dir ?? 'ltr');
    htmlEl.setAttribute('lang', t.code);

    crossFadeEl(headingEl, t.heading);
    crossFadeEl(emailLabel, t.email);
    crossFadeEl(submitButton, t.notify);
    crossFadeEl(langChip, t.lang);

    // If there’s a visible message, also translate it (keep same type)
    if (emailMessageEl.classList.contains('show')) {
      const type = emailMessageEl.classList.contains('error') ? 'error' :
                   emailMessageEl.classList.contains('success') ? 'success' : '';
      const text = type === 'error'
        ? (emailMessageEl.dataset.kind === 'required' ? t.errors.required :
           emailMessageEl.dataset.kind === 'invalid'  ? t.errors.invalid : '')
        : (type === 'success' ? t.success : '');
      if (text) {
        crossFadeEl(emailMessageEl, text);
      }
    }
  }

  function next() {
    idx = (idx + 1) % translations.length;
    crossFadeAll(translations[idx]);
  }

  function start() { if (timer == null) timer = window.setInterval(next, 3000); }
  function stop()  { if (timer != null) { clearInterval(timer); timer = null; } }

  // Initialize
  applyTexts(translations[idx]);
  start();

  // Pause rotation when user is typing/focused or message is visible
  const isBusy = () =>
    !!emailInput?.matches(':focus') ||
    !!emailInput?.value.trim() ||
    emailMessageEl.classList.contains('show');

  emailInput?.addEventListener('focus', stop, { passive: true });
  emailInput?.addEventListener('blur', () => { if (!isBusy()) start(); }, { passive: true });
  emailInput?.addEventListener('input', () => { if (isBusy()) stop(); else start(); }, { passive: true });

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function showMessage(text: string, kind: 'error' | 'success', key?: 'required' | 'invalid') {
    // stop rotation while message is visible
    stop();

    emailMessageEl.textContent = text;
    emailMessageEl.classList.remove('error', 'success');
    emailMessageEl.classList.add(kind, 'show');
    emailMessageEl.setAttribute('role', 'status');
    emailMessageEl.setAttribute('aria-live', 'polite');

    // remember message "kind" for live translation when language changes
    if (key) emailMessageEl.dataset.kind = key; else delete emailMessageEl.dataset.kind;

    if (messageTimer) clearTimeout(messageTimer);
    messageTimer = window.setTimeout(() => {
      emailMessageEl.classList.remove('show');
      // resume rotation if user isn’t focused/typing
      if (!isBusy()) start();
    }, 3000);
  }

  function validateEmail(): boolean {
    const t = translations[idx];
    const value = (emailInput?.value || '').trim();
    if (!value) { showMessage(t.errors.required, 'error', 'required'); return false; }
    if (!emailRegex.test(value)) { showMessage(t.errors.invalid, 'error', 'invalid'); return false; }
    return true;
  }

  // Intercept submit
  submitButton?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    const t = translations[idx];
    showMessage(t.success, 'success');
    // Here you can also actually submit the email to your provider
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