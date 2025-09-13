type Dir = 'ltr' | 'rtl';
type Align = 'center' | 'start' | 'right';

type Translation = {
  code: string;
  dir?: Dir;
  lang: string;
  heading: string;
  email: string;
  notify: string;
  errors: {
    required: string;   // empty email
    invalid: string;    // invalid email format
    submitError: string; // server rejected or non-200
    networkError: string; // fetch failed
  };
  success: string;      // successful subscription
};

const T: Translation[] = [
  { code:'en', dir:'ltr', lang:'English',
    heading:'Be the first to know', email:'Email', notify:'Notify me',
    errors:{
      required:'Please enter your email',
      invalid:'Enter a valid email address',
      submitError:'Something went wrong. Please try again.',
      networkError:'Network error. Please try again.'
    },
    success:"Thanks! We'll notify you." },
  { code:'es', dir:'ltr', lang:'Español',
    heading:'Sé el primero en saberlo', email:'Correo electrónico', notify:'Avisarme',
    errors:{
      required:'Por favor ingresa tu correo',
      invalid:'Ingresa un correo válido',
      submitError:'Algo salió mal. Intenta de nuevo.',
      networkError:'Error de red. Intenta de nuevo.'
    },
    success:'¡Gracias! Te avisaremos.' },
  { code:'fr', dir:'ltr', lang:'Français',
    heading:'Soyez le premier informé', email:'Email', notify:'Prévenez-moi',
    errors:{
      required:"Veuillez saisir votre email",
      invalid:"Entrez une adresse email valide",
      submitError:"Un problème est survenu. Réessayez.",
      networkError:"Erreur réseau. Réessayez."
    },
    success:"Merci ! Nous vous préviendrons." },
  { code:'de', dir:'ltr', lang:'Deutsch',
    heading:'Erfahre es als Erster', email:'Email', notify:'Benachrichtige mich',
    errors:{
      required:'Bitte email eingeben',
      invalid:'Gib eine gültige email ein',
      submitError:'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
      networkError:'Netzwerkfehler. Bitte erneut versuchen.'
    },
    success:'Danke! Wir benachrichtigen dich.' },
  { code:'pt', dir:'ltr', lang:'Português',
    heading:'Seja o primeiro a saber', email:'Email', notify:'Avisar-me',
    errors:{
      required:'Digite seu email',
      invalid:'Digite um email válido',
      submitError:'Algo deu errado. Tente novamente.',
      networkError:'Erro de rede. Tente novamente.'
    },
    success:'Obrigado! Avisaremos você.' },
  { code:'it', dir:'ltr', lang:'Italiano',
    heading:'Sii il primo a saperlo', email:'Email', notify:'Avvisami',
    errors:{
      required:'Inserisci la tua email',
      invalid:'Inserisci un indirizzo email valido',
      submitError:'Qualcosa è andato storto. Riprova.',
      networkError:'Errore di rete. Riprova.'
    },
    success:'Grazie! Ti avviseremo.' },
  { code:'ja', dir:'ltr', lang:'日本語',
    heading:'最新情報をいち早く受け取る', email:'メール', notify:'通知を受け取る',
    errors:{
      required:'メールアドレスを入力してください',
      invalid:'有効なメールアドレスを入力してください',
      submitError:'問題が発生しました。もう一度お試しください。',
      networkError:'ネットワークエラーです。もう一度お試しください。'
    },
    success:'ありがとうございます。通知します。' },
  { code:'ko', dir:'ltr', lang:'한국어',
    heading:'가장 먼저 소식을 받아보세요', email:'이메일', notify:'알림 받기',
    errors:{
      required:'이메일을 입력하세요',
      invalid:'유효한 이메일을 입력하세요',
      submitError:'문제가 발생했습니다. 다시 시도하세요.',
      networkError:'네트워크 오류입니다. 다시 시도하세요.'
    },
    success:'감사합니다! 알려드릴게요.' },
  { code:'zh', dir:'ltr', lang:'中文',
    heading:'第一时间获取消息', email:'邮箱', notify:'通知我',
    errors:{
      required:'请输入邮箱',
      invalid:'请输入有效的邮箱地址',
      submitError:'发生错误，请重试。',
      networkError:'网络错误，请重试。'
    },
    success:'谢谢！我们会通知你。' },
  { code:'ar', dir:'rtl', lang:'العربية',
    heading:'كن أول من يعرف', email:'البريد الإلكتروني', notify:'أبلغني',
    errors:{
      required:'يرجى إدخال بريدك الإلكتروني',
      invalid:'أدخل بريدًا إلكترونيًا صالحًا',
      submitError:'حدث خطأ. يرجى المحاولة مرة أخرى.',
      networkError:'خطأ في الشبكة. يرجى المحاولة مرة أخرى.'
    },
    success:'شكرًا لك! سنخطرك.' },
];

(() => {
  const FADE_MS = 600;

  const htmlEl       = document.documentElement;
  const formBox      = document.querySelector('.form-box') as HTMLElement;
  const headingEl    = document.getElementById('i18n-heading')    as HTMLElement;
  const emailLabel   = document.getElementById('i18n-email-label') as HTMLElement;
  const submitButton = document.getElementById('i18n-submit')      as HTMLButtonElement;
  const langChip     = document.getElementById('i18n-lang')        as HTMLElement;
  const emailInput   = document.getElementById('email')            as HTMLInputElement | null;
  const banner       = document.getElementById('banner')           as HTMLElement;

  type Align = 'center' | 'start' | 'right';
  const targets: Array<{el: HTMLElement; align: Align}> = [
    { el: headingEl,    align: 'center' },
    { el: emailLabel,   align: 'start'  },
    { el: submitButton, align: 'center' },
    { el: langChip,     align: 'right'  },
  ];

  for (const t of targets) prepareLayers(t.el);

  let idx = 0;
  let timer: number | null = null;

  // We’ll use the banner for everything; track its semantic type and key
  function setBanner(text: string, kind: 'success' | 'error') {
    banner.textContent = text;
    banner.classList.remove('success', 'error');
    banner.classList.add('show', kind);
    formBox.classList.add('has-banner');
  }
function hideBanner() {
  // if already hidden, nothing to do
  if (!banner.classList.contains('show')) return;

  // remember the active color class so it stays during fade-out
  const activeKind: 'success' | 'error' | null =
    banner.classList.contains('error') ? 'error' :
    banner.classList.contains('success') ? 'success' :
    null;

  // start fade-out (only remove .show)
  banner.classList.remove('show');

  // after the opacity transition completes, then clean up
  const onDone = () => {
    if (activeKind) banner.classList.remove(activeKind);
    banner.textContent = '';
    formBox.classList.remove('has-banner');
    banner.removeEventListener('transitionend', onDone);
  };

  // prefer transitionend, but add a timeout fallback (keep in sync with CSS: .4s)
  banner.addEventListener('transitionend', onDone);
  window.setTimeout(onDone, 450);
}
  // Keep enough info to re-translate the banner when language changes
  type BannerKey = 'required' | 'invalid' | 'submitError' | 'networkError' | 'success';
  function rememberBanner(kind: 'success' | 'error', key: BannerKey | null) {
    if (key) {
      banner.dataset.kind = kind;
      banner.dataset.key  = key;
    } else {
      delete banner.dataset.kind;
      delete banner.dataset.key;
    }
  }
  function translateBannerFor(t: Translation) {
    const kind = banner.dataset.kind as ('success' | 'error' | undefined);
    const key  = banner.dataset.key as BannerKey | undefined;
    if (!kind || !key) return;
    const text =
      key === 'success'      ? t.success :
      key === 'required'     ? t.errors.required :
      key === 'invalid'      ? t.errors.invalid :
      key === 'submitError'  ? t.errors.submitError :
      key === 'networkError' ? t.errors.networkError : '';
    if (text) setBanner(text, kind);
  }

  function prepareLayers(el: HTMLElement): void {
    if (el.querySelector('.i18n-wrap')) return;
    const wrap = document.createElement('span');
    wrap.className = 'i18n-wrap';

    const current = document.createElement('span');
    current.className = 'i18n-layer is-current';
    current.textContent = el.textContent ?? '';

    const next = document.createElement('span');
    next.className = 'i18n-layer';

    el.textContent = '';
    el.appendChild(wrap);
    wrap.appendChild(current);
    wrap.appendChild(next);
  }

  function setAlign(layer: HTMLElement, dir: Dir, align: Align): void {
    if (align === 'center') layer.style.textAlign = 'center';
    else if (align === 'right') layer.style.textAlign = 'right';
    else layer.style.textAlign = (dir === 'rtl' ? 'right' : 'left');
  }

  // ---------- line counting & per-layer shift for H2 ----------
  function lineHeightPx(el: HTMLElement): number {
    const cs = getComputedStyle(el);
    const lh = cs.lineHeight;
    if (lh.endsWith('px')) return parseFloat(lh);
    const fs = parseFloat(cs.fontSize || '16');
    return fs * 1.2;
  }
  function countLines(container: HTMLElement, layer: HTMLElement): number {
    const lh = lineHeightPx(container);
    return Math.max(1, Math.round(layer.scrollHeight / lh));
  }
  function computeShiftPx(container: HTMLElement, layer: HTMLElement): number {
    const n = countLines(container, layer);
    const lh = lineHeightPx(container);
    return -(Math.max(0, n - 1)) * lh;  // negative = move up
  }
  function applyLayerShift(container: HTMLElement, layer: HTMLElement): void {
    layer.style.transform = `translateY(${computeShiftPx(container, layer)}px)`;
  }

  function crossFade(el: HTMLElement, text: string, dir: Dir, align: Align): void {
    const current = el.querySelector('.i18n-layer.is-current') as HTMLElement;
    const next    = el.querySelector('.i18n-layer:not(.is-current)') as HTMLElement;

    next.textContent = text;
    next.setAttribute('dir', dir);
    setAlign(next, dir, align);

    if (el === headingEl) {
      applyLayerShift(headingEl, current);
      applyLayerShift(headingEl, next);
    }

    // lock size during fade to avoid blips
    const rect = el.getBoundingClientRect();
    el.style.minWidth  = `${rect.width}px`;
    el.style.minHeight = `${rect.height}px`;

    requestAnimationFrame(() => {
      next.classList.add('is-current');
      current.classList.remove('is-current');
    });

    window.setTimeout(() => {
      el.setAttribute('dir', dir);
      el.style.minWidth = '';
      el.style.minHeight = '';
      if (el === headingEl) {
        const curNow = el.querySelector('.i18n-layer.is-current') as HTMLElement | null;
        if (curNow) applyLayerShift(headingEl, curNow);
      }
    }, FADE_MS);
  }

  function applyTexts(tl: Translation): void {
    htmlEl.setAttribute('lang', tl.code);
    const d: Dir = tl.dir ?? 'ltr';

    // seed texts (no fade)
    (headingEl.querySelector('.i18n-layer.is-current') as HTMLElement).textContent = tl.heading;
    (emailLabel.querySelector('.i18n-layer.is-current') as HTMLElement).textContent = tl.email;
    (submitButton.querySelector('.i18n-layer.is-current') as HTMLElement).textContent = tl.notify;
    (langChip.querySelector('.i18n-layer.is-current') as HTMLElement).textContent = tl.lang;

    headingEl.setAttribute('dir', d);
    emailLabel.setAttribute('dir', d);
    submitButton.setAttribute('dir', d);
    langChip.setAttribute('dir', d);

    if (emailInput) {
      emailInput.setAttribute('dir', d);
      emailInput.style.textAlign = (d === 'rtl' ? 'right' : 'left');
    }

    // initial transform on the current heading layer
    const cur = headingEl.querySelector('.i18n-layer.is-current') as HTMLElement | null;
    if (cur) applyLayerShift(headingEl, cur);

    // if a banner is visible, translate its text
    if (banner.classList.contains('show')) translateBannerFor(tl);
  }

  function crossFadeAll(tl: Translation): void {
    htmlEl.setAttribute('lang', tl.code);
    const d: Dir = tl.dir ?? 'ltr';

    crossFade(headingEl,    tl.heading, d, 'center');
    crossFade(emailLabel,   tl.email,   d, 'start');
    crossFade(submitButton, tl.notify,  d, 'center');
    crossFade(langChip,     tl.lang,    d, 'right');

    if (emailInput) {
      emailInput.setAttribute('dir', d);
      emailInput.style.textAlign = (d === 'rtl' ? 'right' : 'left');
    }

    // also keep banner translated during rotation
    if (banner.classList.contains('show')) translateBannerFor(tl);
  }

  // rotation
  applyTexts(T[idx]);
  timer = window.setInterval(() => {
    idx = (idx + 1) % T.length;
    crossFadeAll(T[idx]);
  }, 3000);

  // keep transforms accurate on resize/font ready
  (document as any).fonts?.ready?.then?.(() => {
    const cur = headingEl.querySelector('.i18n-layer.is-current') as HTMLElement | null;
    if (cur) applyLayerShift(headingEl, cur);
  });
  window.addEventListener('resize', () => {
    const cur = headingEl.querySelector('.i18n-layer.is-current') as HTMLElement | null;
    if (cur) applyLayerShift(headingEl, cur);
  });

  // pause/resume while typing or when banner visible
  const isBusy = (): boolean =>
    !!emailInput?.matches(':focus') ||
    !!emailInput?.value.trim() ||
    banner.classList.contains('show');

  function start(): void {
    if (timer == null) {
      timer = window.setInterval(() => {
        idx = (idx + 1) % T.length;
        crossFadeAll(T[idx]);
      }, 3000);
    }
  }
  function stop(): void {
    if (timer != null) { window.clearInterval(timer); timer = null; }
  }

  emailInput?.addEventListener('focus', stop, { passive: true });
  emailInput?.addEventListener('blur', () => { if (!isBusy()) start(); }, { passive: true });
  emailInput?.addEventListener('input', () => { if (isBusy()) stop(); else start(); }, { passive: true });

  // Validation + submission: use BANNER ONLY (translated)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateEmail(): boolean {
    const tl = T[idx];
    const value = (emailInput?.value || '').trim();
    if (!value) {
      setBanner(tl.errors.required, 'error');
      rememberBanner('error', 'required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setBanner(tl.errors.invalid, 'error');
      rememberBanner('error', 'invalid');
      return false;
    }
    return true;
  }

  const form = document.getElementById('notify-form') as HTMLFormElement | null;

  function encode(data: Record<string, string>): string {
    return Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
  }

  form?.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    // show validation errors in banner
    if (!validateEmail()) {
      // auto-clear banner after 3s so rotation can resume if desired
      setTimeout(() => { if (banner.classList.contains('show')) { hideBanner(); if (!isBusy()) start(); } }, 3000);
      stop(); // pause rotation while visible
      return;
    }

    // Try submit
    stop();
    const tl = T[idx];

    try {
      const formName = 'notify';
      const email = emailInput?.value.trim() ?? '';
      const body = encode({ 'form-name': formName, email });

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (res.ok) {
        form?.reset();
        setBanner(tl.success, 'success');
        rememberBanner('success', 'success');
      } else {
        setBanner(tl.errors.submitError, 'error');
        rememberBanner('error', 'submitError');
      }
    } catch {
      setBanner(tl.errors.networkError, 'error');
      rememberBanner('error', 'networkError');
    }

    // auto-hide banner after 3s and resume rotation
    setTimeout(() => { hideBanner(); if (!isBusy()) start(); }, 3000);
  });
})();