type Align = 'center' | 'start' | 'right';

type Translation = {
  code: string;
  lang: string;
  heading: string;
  email: string;
  notify: string;
  errors: {
    required: string;
    invalid: string;
    submitError: string;
    networkError: string;
    duplicate: string;
  };
  success: string;
  back: string;
};

const T: Translation[] = [
  { 
    code:'en', 
    lang:'English',
    heading:'Be the first to know', 
    email:'Email', 
    notify:'Notify me',
    errors:{
      required:'Please enter your email',
      invalid:'Enter a valid email address',
      submitError:'Something went wrong. Please try again.',
      networkError:'Network error. Please try again.',
      duplicate:'That email has already been submitted'
    },
    success:`You've been added to the list, we'll email you when the site is live`, 
    back:'Enter another email' 
  },
  { 
    code:'es', 
    lang:'Español',
    heading:'Sé el primero en saberlo', 
    email:'Correo electrónico', 
    notify:'Avisarme',
    errors:{
      required:'Por favor ingresa tu correo',
      invalid:'Ingresa un correo válido',
      submitError:'Algo salió mal. Intenta de nuevo.',
      networkError:'Error de red. Intenta de nuevo.',
      duplicate:'Ese correo ya ha sido enviado'
    },
    success:'Te hemos añadido a la lista; te enviaremos un correo cuando el sitio esté en línea.', 
    back:'Ingresar otro correo' 
  },
  { 
    code:'fr', 
    lang:'Français',
    heading:'Soyez le premier informé', 
    email:'Email', 
    notify:'Prévenez-moi',
    errors:{
      required:'Veuillez saisir votre email',
      invalid:"Entrez une adresse email valide",
      submitError:'Un problème est survenu. Réessayez.',
      networkError:'Erreur réseau. Réessayez.',
      duplicate:"Cet e-mail a déjà été soumis"
    },
    success:'Vous avez été ajouté à la liste; nous vous enverrons un email lorsque le site sera en ligne.', 
    back:'Saisir un autre e-mail' 
  },
  { 
    code:'de', 
    lang:'Deutsch',
    heading:'Erfahre es als Erster', 
    email:'Email', 
    notify:'Benachrichtige mich',
    errors:{
      required:'Bitte email eingeben',
      invalid:'Gib eine gültige email ein',
      submitError:'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
      networkError:'Netzwerkfehler. Bitte erneut versuchen.',
      duplicate:'Diese E-Mail wurde bereits eingereicht'
    },
    success:'Du wurdest zur Liste hinzugefügt; wir senden dir eine email, sobald die Website online ist.', 
    back:'Weitere E-Mail eingeben' 
  },
  { 
    code:'pt', 
    lang:'Português',
    heading:'Seja o primeiro a saber', 
    email:'Email', 
    notify:'Avisar-me',
    errors:{
      required:'Digite seu email',
      invalid:'Digite um email válido',
      submitError:'Algo deu errado. Tente novamente.',
      networkError:'Erro de rede. Tente novamente.',
      duplicate:'Esse e-mail já foi cadastrado'
    },
    success:'Você foi adicionado à lista; enviaremos um email quando o site estiver no ar.', 
    back:'Inserir outro e-mail' 
  },
  { 
    code:'it', 
    lang:'Italiano',
    heading:'Sii il primo a saperlo', 
    email:'Email', 
    notify:'Avvisami',
    errors:{
      required:'Inserisci la tua email',
      invalid:'Inserisci un indirizzo email valido',
      submitError:'Qualcosa è andato storto. Riprova.',
      networkError:'Errore di rete. Riprova.',
      duplicate:'Questa email è già stata inviata'
    },
    success:'Sei stato aggiunto alla lista; ti invieremo un’email quando il sito sarà online.', 
    back:"Inserisci un'altra email" 
  },
  { 
    code:'ja', 
    lang:'日本語',
    heading:'最新情報をいち早く受け取る', 
    email:'メール', 
    notify:'通知を受け取る',
    errors:{
      required:'メールアドレスを入力してください',
      invalid:'有効なメールアドレスを入力してください',
      submitError:'問題が発生しました。もう一度お試しください。',
      networkError:'ネットワークエラーです。もう一度お試しください。',
      duplicate:'そのメールアドレスは既に登録されています'
    },
    success:'リストに追加しました。サイトが公開されたらメールでお知らせします。', 
    back:'別のメールを入力' 
  },
  { 
    code:'ko', 
    lang:'한국어',
    heading:'가장 먼저 소식을 받아보세요', 
    email:'이메일', 
    notify:'알림 받기',
    errors:{
      required:'이메일을 입력하세요',
      invalid:'유효한 이메일을 입력하세요',
      submitError:'문제가 발생했습니다. 다시 시도하세요.',
      networkError:'네트워크 오류입니다. 다시 시도하세요.',
      duplicate:'이미 등록된 이메일입니다'
    },
    success:'목록에 추가되었습니다. 사이트가 공개되면 이메일을 보내드릴게요.', 
    back:'다른 이메일 입력' 
  },
  { 
    code:'zh', 
    lang:'中文',
    heading:'第一时间获取消息', 
    email:'邮箱', 
    notify:'通知我',
    errors:{
      required:'请输入邮箱',
      invalid:'请输入有效的邮箱地址',
      submitError:'发生错误，请重试。',
      networkError:'网络错误，请重试。',
      duplicate:'该邮箱已提交过'
    },
    success:'你已加入名单，网站上线时我们会给你发送邮件。', 
    back:'输入另一个邮箱' 
  }
];

(() => {
  'use strict';

  /// ----- True to bypass email validation (button transfers to success) ----- \\\
  const DEV_BYPASS_VALIDATION = false;  

  /// ----- Transition Timing ----- \\\
  const ROTATE_MS = 3000;
  const FADE_MS = 900;
  const BANNER_MS = 2300;
  const HEIGHT_MS = 800;
  const CONTENT_FADE_MS = 160;
  const APPEAR_FRACTION = 0.60;

  /// ----- Elements --- \\\
  const panel = document.getElementById('panel') as HTMLElement;
  const stateForm = document.getElementById('state-form') as HTMLElement;
  const stateSuccess = document.getElementById('state-success') as HTMLElement;
  const banner = document.getElementById('banner') as HTMLElement;
  const emailEl = document.getElementById('email') as HTMLInputElement;
  const formEl = document.getElementById('notify-form') as HTMLFormElement;
  const backBtn = document.getElementById('i18n-back') as HTMLButtonElement;
  const heading = document.getElementById('i18n-heading') as HTMLElement;
  const emailLabel = document.getElementById('i18n-email-label') as HTMLElement;
  const submitBtn = document.getElementById('i18n-submit') as HTMLElement;
  const langChip  = document.getElementById('i18n-lang') as HTMLElement;

  const ROTATE_TARGETS: HTMLElement[] = [heading, emailLabel, submitBtn, langChip].filter(Boolean) as HTMLElement[];

  const successH2 = document.getElementById('i18n-success') as HTMLElement;
  const successBack = document.getElementById('i18n-back') as HTMLElement;

  
  /// ----- Add random start point for each row ----- \\\
  document.querySelectorAll<HTMLElement>('.poster-rows .row .inner').forEach(el => {
    const durStr = getComputedStyle(el).animationDuration;
    const dur = parseFloat(durStr.split(',')[0]) || 140;

    el.style.animationDelay = `${-(Math.random() * dur)}s`;
  });

  
  /// ----- rotation state ----- \\\
  let idx = 0;
  let rotateTimer: number | null = null;

  prepareAllI18nTargets(document, ROTATE_TARGETS);
  applyFormTexts(T[idx]);

  startRotate();

  /// ----- rotation control ----- \\\
  function startRotate() {
    if (rotateTimer != null) return;

    rotateTimer = window.setInterval(() => {
      if (isInteractionActive()) return;

      idx = (idx + 1) % T.length;
      crossFadeAll(T[idx]);
    }, ROTATE_MS);
  }
  function stopRotate() {
    if (rotateTimer == null) return;

    clearInterval(rotateTimer);
    rotateTimer = null;
  }

  function isInteractionActive(): boolean {
    return document.activeElement === emailEl || (emailEl.value.trim().length > 0);
  }

  emailEl.addEventListener('focus', stopRotate);
  emailEl.addEventListener('blur', () => { if (!isInteractionActive()) startRotate(); });
  emailEl.addEventListener('input', () => { if (isInteractionActive()) stopRotate(); else startRotate(); });

  function prepareLayers(el: HTMLElement): void {
    if (el.querySelector('.i18n-wrap')) return;

    const wrap = document.createElement('span'); wrap.className = 'i18n-wrap';
    const cur  = document.createElement('span'); cur.className  = 'i18n-layer is-current';

    cur.textContent = el.textContent ?? '';

    const next = document.createElement('span'); next.className = 'i18n-layer';

    el.textContent = '';
    el.appendChild(wrap); wrap.appendChild(cur); wrap.appendChild(next);
  }

  function prepareAllI18nTargets(scope: ParentNode, only: HTMLElement[]) {
    only.forEach(prepareLayers);
  }

  function crossFade(el: HTMLElement, text: string, align: Align='center') {
    const cur  = el.querySelector('.i18n-layer.is-current') as HTMLElement | null;
    const next = el.querySelector('.i18n-layer:not(.is-current)') as HTMLElement | null;
    if (!cur || !next) return;

    const r = el.getBoundingClientRect();
    (el.style as any).minWidth  = `${r.width}px`;
    (el.style as any).minHeight = `${r.height}px`;

    next.textContent = text;
    (next.style as any).textAlign = align === 'start' ? 'left' : align === 'right' ? 'right' : 'center';

    requestAnimationFrame(() => { next.classList.add('is-current'); cur.classList.remove('is-current'); });
    window.setTimeout(() => { (el.style as any).minWidth = ''; (el.style as any).minHeight = ''; }, FADE_MS);
  }

  function applyFormTexts(t: Translation) {
    const set = (id: string, val: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const layer = el.querySelector('.i18n-layer.is-current') as HTMLElement | null;
      if (layer) layer.textContent = val;
    };

    set('i18n-heading', t.heading);
    set('i18n-email-label', t.email);
    set('i18n-submit', t.notify);

    const langLayer = langChip?.querySelector('.i18n-layer.is-current') as HTMLElement | null;
    if (langLayer) langLayer.textContent = t.lang;
  }

  function crossFadeAll(t: Translation) {
    if (heading)    crossFade(heading, t.heading, 'center');
    if (emailLabel) crossFade(emailLabel, t.email, 'start');
    if (submitBtn)  crossFade(submitBtn, t.notify, 'center');
    if (langChip)   crossFade(langChip, t.lang, 'right');
  }

  let bannerTimer: number | null = null;

  function showBanner(msg: string, kind: 'error'|'success') {
    banner.textContent = msg;
    banner.classList.remove('error', 'success', 'show');

    void banner.offsetHeight;
    banner.classList.add(kind, 'show');

    if (bannerTimer != null) clearTimeout(bannerTimer);
    bannerTimer = window.setTimeout(() => { banner.classList.remove('show'); }, BANNER_MS);
  }

  function fadeChildren(el: HTMLElement, on: boolean, dur = FADE_MS) {
    el.querySelectorAll<HTMLElement>(':scope > *').forEach(child => {
      child.style.transition = `opacity ${dur}ms ease`;
      child.style.opacity = on ? '1' : '0';
    });
  }

  function measureAutoPanelHeightWith(stateEl: HTMLElement): number {
    const clone = panel.cloneNode(true) as HTMLElement;
    clone.id = '';
    clone.style.position = 'absolute';
    clone.style.left = '-99999px';
    clone.style.top = '0';
    clone.style.height = 'auto';
    clone.style.minHeight = '0';
    clone.style.maxHeight = 'none';
    clone.style.transition = 'none';
    clone.style.willChange = 'auto';

    const cForm    = clone.querySelector('#state-form') as HTMLElement;
    const cSuccess = clone.querySelector('#state-success') as HTMLElement;

    if (stateEl.id === 'state-success') {
      cForm.classList.remove('is-visible'); cForm.classList.add('is-hidden');
      cSuccess.classList.remove('is-hidden'); cSuccess.classList.add('is-visible');
    } else {
      cSuccess.classList.remove('is-visible'); cSuccess.classList.add('is-hidden');
      cForm.classList.remove('is-hidden'); cForm.classList.add('is-visible');
    }

    document.body.appendChild(clone);
    const targetH = Math.round(clone.getBoundingClientRect().height);

    document.body.removeChild(clone);
    return targetH;
  }


  function swapState(to: 'form' | 'success') {
    const fromEl = to === 'form' ? stateSuccess : stateForm;
    const toEl   = to === 'form' ? stateForm    : stateSuccess;

    const startH = panel.getBoundingClientRect().height;

    panel.style.height = `${startH}px`;
    panel.style.transition = `height ${HEIGHT_MS}ms cubic-bezier(0.22,1,0.36,1)`;

    fadeChildren(fromEl, false, CONTENT_FADE_MS);

    fromEl.classList.remove('is-visible'); 
    fromEl.classList.add('is-hidden');

    toEl.classList.remove('is-hidden');    
    toEl.classList.add('is-visible');

    fromEl.setAttribute('aria-hidden', 'true');
    toEl.setAttribute('aria-hidden', 'false');

    fadeChildren(toEl, false, 0);

    const targetH = measureAutoPanelHeightWith(toEl);

    requestAnimationFrame(() => { panel.style.height = `${targetH}px`; });

    const appearDelay = Math.max(0, Math.floor(HEIGHT_MS * APPEAR_FRACTION) - CONTENT_FADE_MS);
    setTimeout(() => { fadeChildren(toEl, true, CONTENT_FADE_MS); }, appearDelay);

    const finish = () => {
      panel.removeEventListener('transitionend', finish);
      const finalH = panel.getBoundingClientRect().height;

      panel.style.transition = '';
      panel.style.height = `${finalH}px`;

      requestAnimationFrame(() => { panel.style.height = ''; });
    };

    panel.addEventListener('transitionend', finish);
    setTimeout(finish, HEIGHT_MS + 120);
  }


  /// ---------------------------------------- Submit/Back Logic ---------------------------------------- \\\
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const t = T[idx];
    stopRotate();

    const value = emailEl.value.trim().toLowerCase();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!DEV_BYPASS_VALIDATION) {
      if (!value) { 
        showBanner(t.errors.required, 'error'); 
        emailEl.focus(); return; 
      }
      if (!re.test(value)) { 
        showBanner(t.errors.invalid, 'error'); 
        emailEl.focus(); return; 
      }
    }

    ///  1) Optional quick GET for fast feedback  \\\
    try {
      const r = await fetch(`/.netlify/functions/subscribe?email=${encodeURIComponent(value)}`);
      let j: any = null;
      try { j = await r.clone().json(); } catch {}

      if (r.status === 200 && j && typeof j.duplicate === 'boolean') {
        if (j.duplicate) {
          showBanner(t.errors.duplicate, 'error');
          return;
        }
      } else if (r.status === 400) {
        ///  server said bad input (e.g. missing/invalid email)  \\\
        showBanner(t.errors.invalid, 'error');
        return;
      } else {
        ///  404/405/500 etc — function exists but returned an error  \\\
        showBanner(t.errors.submitError, 'error');
        return;
      }
    } catch {
      ///  true network failures only (offline, DNS, blocked)  \\\
      showBanner(t.errors.networkError, 'error');
      return;
    }

    ///  2) POST (atomic server-side check + insert)  \\\
    try {
      const r = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });

      let j: any = null;

      try { 
        j = await r.clone().json(); 
      } catch {}

      if (r.status === 200 && j?.ok) {
        successH2.textContent = t.success;
        successBack.textContent = t.back;

        banner.classList.remove('show');
        swapState('success');

        return;
      }

      if (r.status === 200 && j?.duplicate) {
        showBanner(t.errors.duplicate, 'error');
        return;
      }

      if (r.status === 400) {
        showBanner(t.errors.invalid, 'error');
        return;
      }

      showBanner(t.errors.submitError, 'error');

    } catch {
      showBanner(t.errors.networkError, 'error');
    }
  });

  backBtn.addEventListener('click', () => {
    emailEl.value = '';
    banner.classList.remove('show');

    swapState('form');
    startRotate();
    applyFormTexts(T[idx]);
    setTimeout(() => emailEl.focus(), FADE_MS);
  });
})();