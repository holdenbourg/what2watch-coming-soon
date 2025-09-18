// src/main.ts
var T = [
  {
    code: "en",
    lang: "English",
    heading: "Be the first to know",
    email: "Email",
    notify: "Notify me",
    errors: {
      required: "Please enter your email",
      invalid: "Enter a valid email address",
      submitError: "Something went wrong. Please try again.",
      networkError: "Network error. Please try again.",
      duplicate: "That email has already been submitted"
    },
    success: `You've been added to the list, we'll email you when the site is live`,
    back: "Enter another email"
  },
  {
    code: "es",
    lang: "Espa\xF1ol",
    heading: "S\xE9 el primero en saberlo",
    email: "Correo electr\xF3nico",
    notify: "Avisarme",
    errors: {
      required: "Por favor ingresa tu correo",
      invalid: "Ingresa un correo v\xE1lido",
      submitError: "Algo sali\xF3 mal. Intenta de nuevo.",
      networkError: "Error de red. Intenta de nuevo.",
      duplicate: "Ese correo ya ha sido enviado"
    },
    success: "Te hemos a\xF1adido a la lista; te enviaremos un correo cuando el sitio est\xE9 en l\xEDnea.",
    back: "Ingresar otro correo"
  },
  {
    code: "fr",
    lang: "Fran\xE7ais",
    heading: "Soyez le premier inform\xE9",
    email: "Email",
    notify: "Pr\xE9venez-moi",
    errors: {
      required: "Veuillez saisir votre email",
      invalid: "Entrez une adresse email valide",
      submitError: "Un probl\xE8me est survenu. R\xE9essayez.",
      networkError: "Erreur r\xE9seau. R\xE9essayez.",
      duplicate: "Cet e-mail a d\xE9j\xE0 \xE9t\xE9 soumis"
    },
    success: "Vous avez \xE9t\xE9 ajout\xE9 \xE0 la liste; nous vous enverrons un email lorsque le site sera en ligne.",
    back: "Saisir un autre e-mail"
  },
  {
    code: "de",
    lang: "Deutsch",
    heading: "Erfahre es als Erster",
    email: "Email",
    notify: "Benachrichtige mich",
    errors: {
      required: "Bitte email eingeben",
      invalid: "Gib eine g\xFCltige email ein",
      submitError: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
      networkError: "Netzwerkfehler. Bitte erneut versuchen.",
      duplicate: "Diese E-Mail wurde bereits eingereicht"
    },
    success: "Du wurdest zur Liste hinzugef\xFCgt; wir senden dir eine email, sobald die Website online ist.",
    back: "Weitere E-Mail eingeben"
  },
  {
    code: "pt",
    lang: "Portugu\xEAs",
    heading: "Seja o primeiro a saber",
    email: "Email",
    notify: "Avisar-me",
    errors: {
      required: "Digite seu email",
      invalid: "Digite um email v\xE1lido",
      submitError: "Algo deu errado. Tente novamente.",
      networkError: "Erro de rede. Tente novamente.",
      duplicate: "Esse e-mail j\xE1 foi cadastrado"
    },
    success: "Voc\xEA foi adicionado \xE0 lista; enviaremos um email quando o site estiver no ar.",
    back: "Inserir outro e-mail"
  },
  {
    code: "it",
    lang: "Italiano",
    heading: "Sii il primo a saperlo",
    email: "Email",
    notify: "Avvisami",
    errors: {
      required: "Inserisci la tua email",
      invalid: "Inserisci un indirizzo email valido",
      submitError: "Qualcosa \xE8 andato storto. Riprova.",
      networkError: "Errore di rete. Riprova.",
      duplicate: "Questa email \xE8 gi\xE0 stata inviata"
    },
    success: "Sei stato aggiunto alla lista; ti invieremo un\u2019email quando il sito sar\xE0 online.",
    back: "Inserisci un'altra email"
  },
  {
    code: "ja",
    lang: "\u65E5\u672C\u8A9E",
    heading: "\u6700\u65B0\u60C5\u5831\u3092\u3044\u3061\u65E9\u304F\u53D7\u3051\u53D6\u308B",
    email: "\u30E1\u30FC\u30EB",
    notify: "\u901A\u77E5\u3092\u53D7\u3051\u53D6\u308B",
    errors: {
      required: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
      invalid: "\u6709\u52B9\u306A\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
      submitError: "\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
      networkError: "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC\u3067\u3059\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
      duplicate: "\u305D\u306E\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u65E2\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059"
    },
    success: "\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3057\u307E\u3057\u305F\u3002\u30B5\u30A4\u30C8\u304C\u516C\u958B\u3055\u308C\u305F\u3089\u30E1\u30FC\u30EB\u3067\u304A\u77E5\u3089\u305B\u3057\u307E\u3059\u3002",
    back: "\u5225\u306E\u30E1\u30FC\u30EB\u3092\u5165\u529B"
  },
  {
    code: "ko",
    lang: "\uD55C\uAD6D\uC5B4",
    heading: "\uAC00\uC7A5 \uBA3C\uC800 \uC18C\uC2DD\uC744 \uBC1B\uC544\uBCF4\uC138\uC694",
    email: "\uC774\uBA54\uC77C",
    notify: "\uC54C\uB9BC \uBC1B\uAE30",
    errors: {
      required: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694",
      invalid: "\uC720\uD6A8\uD55C \uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694",
      submitError: "\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
      networkError: "\uB124\uD2B8\uC6CC\uD06C \uC624\uB958\uC785\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
      duplicate: "\uC774\uBBF8 \uB4F1\uB85D\uB41C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4"
    },
    success: "\uBAA9\uB85D\uC5D0 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC0AC\uC774\uD2B8\uAC00 \uACF5\uAC1C\uB418\uBA74 \uC774\uBA54\uC77C\uC744 \uBCF4\uB0B4\uB4DC\uB9B4\uAC8C\uC694.",
    back: "\uB2E4\uB978 \uC774\uBA54\uC77C \uC785\uB825"
  },
  {
    code: "zh",
    lang: "\u4E2D\u6587",
    heading: "\u7B2C\u4E00\u65F6\u95F4\u83B7\u53D6\u6D88\u606F",
    email: "\u90AE\u7BB1",
    notify: "\u901A\u77E5\u6211",
    errors: {
      required: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
      invalid: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u90AE\u7BB1\u5730\u5740",
      submitError: "\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5\u3002",
      networkError: "\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5\u3002",
      duplicate: "\u8BE5\u90AE\u7BB1\u5DF2\u63D0\u4EA4\u8FC7"
    },
    success: "\u4F60\u5DF2\u52A0\u5165\u540D\u5355\uFF0C\u7F51\u7AD9\u4E0A\u7EBF\u65F6\u6211\u4EEC\u4F1A\u7ED9\u4F60\u53D1\u9001\u90AE\u4EF6\u3002",
    back: "\u8F93\u5165\u53E6\u4E00\u4E2A\u90AE\u7BB1"
  }
];
(() => {
  "use strict";
  const DEV_BYPASS_VALIDATION = false;
  const ROTATE_MS = 3e3;
  const FADE_MS = 900;
  const BANNER_MS = 2300;
  const HEIGHT_MS = 800;
  const CONTENT_FADE_MS = 160;
  const APPEAR_FRACTION = 0.6;
  const panel = document.getElementById("panel");
  const stateForm = document.getElementById("state-form");
  const stateSuccess = document.getElementById("state-success");
  const banner = document.getElementById("banner");
  const emailEl = document.getElementById("email");
  const formEl = document.getElementById("notify-form");
  const backBtn = document.getElementById("i18n-back");
  const heading = document.getElementById("i18n-heading");
  const emailLabel = document.getElementById("i18n-email-label");
  const submitBtn = document.getElementById("i18n-submit");
  const langChip = document.getElementById("i18n-lang");
  const ROTATE_TARGETS = [heading, emailLabel, submitBtn, langChip].filter(Boolean);
  const successH2 = document.getElementById("i18n-success");
  const successBack = document.getElementById("i18n-back");
  let idx = 0;
  let rotateTimer = null;
  prepareAllI18nTargets(document, ROTATE_TARGETS);
  applyFormTexts(T[idx]);
  startRotate();
  document.querySelectorAll(".poster-rows .row .inner").forEach((el) => {
    const durStr = getComputedStyle(el).animationDuration;
    const dur = parseFloat(durStr.split(",")[0]) || 140;
    el.style.animationDelay = `${-(Math.random() * dur)}s`;
  });
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
  function isInteractionActive() {
    return document.activeElement === emailEl || emailEl.value.trim().length > 0;
  }
  emailEl.addEventListener("focus", stopRotate);
  emailEl.addEventListener("blur", () => {
    if (!isInteractionActive()) startRotate();
  });
  emailEl.addEventListener("input", () => {
    if (isInteractionActive()) stopRotate();
    else startRotate();
  });
  function prepareLayers(el) {
    if (el.querySelector(".i18n-wrap")) return;
    const wrap = document.createElement("span");
    wrap.className = "i18n-wrap";
    const cur = document.createElement("span");
    cur.className = "i18n-layer is-current";
    cur.textContent = el.textContent ?? "";
    const next = document.createElement("span");
    next.className = "i18n-layer";
    el.textContent = "";
    el.appendChild(wrap);
    wrap.appendChild(cur);
    wrap.appendChild(next);
  }
  function prepareAllI18nTargets(scope, only) {
    only.forEach(prepareLayers);
  }
  function crossFade(el, text, align = "center") {
    const cur = el.querySelector(".i18n-layer.is-current");
    const next = el.querySelector(".i18n-layer:not(.is-current)");
    if (!cur || !next) return;
    const r = el.getBoundingClientRect();
    el.style.minWidth = `${r.width}px`;
    el.style.minHeight = `${r.height}px`;
    next.textContent = text;
    next.style.textAlign = align === "start" ? "left" : align === "right" ? "right" : "center";
    requestAnimationFrame(() => {
      next.classList.add("is-current");
      cur.classList.remove("is-current");
    });
    window.setTimeout(() => {
      el.style.minWidth = "";
      el.style.minHeight = "";
    }, FADE_MS);
  }
  function applyFormTexts(t) {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (!el) return;
      const layer = el.querySelector(".i18n-layer.is-current");
      if (layer) layer.textContent = val;
    };
    set("i18n-heading", t.heading);
    set("i18n-email-label", t.email);
    set("i18n-submit", t.notify);
    const langLayer = langChip?.querySelector(".i18n-layer.is-current");
    if (langLayer) langLayer.textContent = t.lang;
  }
  function crossFadeAll(t) {
    if (heading) crossFade(heading, t.heading, "center");
    if (emailLabel) crossFade(emailLabel, t.email, "start");
    if (submitBtn) crossFade(submitBtn, t.notify, "center");
    if (langChip) crossFade(langChip, t.lang, "right");
  }
  let bannerTimer = null;
  function showBanner(msg, kind) {
    banner.textContent = msg;
    banner.classList.remove("error", "success", "show");
    void banner.offsetHeight;
    banner.classList.add(kind, "show");
    if (bannerTimer != null) clearTimeout(bannerTimer);
    bannerTimer = window.setTimeout(() => {
      banner.classList.remove("show");
    }, BANNER_MS);
  }
  function fadeChildren(el, on, dur = FADE_MS) {
    el.querySelectorAll(":scope > *").forEach((child) => {
      child.style.transition = `opacity ${dur}ms ease`;
      child.style.opacity = on ? "1" : "0";
    });
  }
  function measureAutoPanelHeightWith(stateEl) {
    const clone = panel.cloneNode(true);
    clone.id = "";
    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.height = "auto";
    clone.style.minHeight = "0";
    clone.style.maxHeight = "none";
    clone.style.transition = "none";
    clone.style.willChange = "auto";
    const cForm = clone.querySelector("#state-form");
    const cSuccess = clone.querySelector("#state-success");
    if (stateEl.id === "state-success") {
      cForm.classList.remove("is-visible");
      cForm.classList.add("is-hidden");
      cSuccess.classList.remove("is-hidden");
      cSuccess.classList.add("is-visible");
    } else {
      cSuccess.classList.remove("is-visible");
      cSuccess.classList.add("is-hidden");
      cForm.classList.remove("is-hidden");
      cForm.classList.add("is-visible");
    }
    document.body.appendChild(clone);
    const targetH = Math.round(clone.getBoundingClientRect().height);
    document.body.removeChild(clone);
    return targetH;
  }
  function swapState(to) {
    const fromEl = to === "form" ? stateSuccess : stateForm;
    const toEl = to === "form" ? stateForm : stateSuccess;
    const startH = panel.getBoundingClientRect().height;
    panel.style.height = `${startH}px`;
    panel.style.transition = `height ${HEIGHT_MS}ms cubic-bezier(0.22,1,0.36,1)`;
    fadeChildren(fromEl, false, CONTENT_FADE_MS);
    fromEl.classList.remove("is-visible");
    fromEl.classList.add("is-hidden");
    toEl.classList.remove("is-hidden");
    toEl.classList.add("is-visible");
    fromEl.setAttribute("aria-hidden", "true");
    toEl.setAttribute("aria-hidden", "false");
    fadeChildren(toEl, false, 0);
    const targetH = measureAutoPanelHeightWith(toEl);
    requestAnimationFrame(() => {
      panel.style.height = `${targetH}px`;
    });
    const appearDelay = Math.max(0, Math.floor(HEIGHT_MS * APPEAR_FRACTION) - CONTENT_FADE_MS);
    setTimeout(() => {
      fadeChildren(toEl, true, CONTENT_FADE_MS);
    }, appearDelay);
    const finish = () => {
      panel.removeEventListener("transitionend", finish);
      const finalH = panel.getBoundingClientRect().height;
      panel.style.transition = "";
      panel.style.height = `${finalH}px`;
      requestAnimationFrame(() => {
        panel.style.height = "";
      });
    };
    panel.addEventListener("transitionend", finish);
    setTimeout(finish, HEIGHT_MS + 120);
  }
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = T[idx];
    stopRotate();
    const value = emailEl.value.trim().toLowerCase();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!DEV_BYPASS_VALIDATION) {
      if (!value) {
        showBanner(t.errors.required, "error");
        emailEl.focus();
        return;
      }
      if (!re.test(value)) {
        showBanner(t.errors.invalid, "error");
        emailEl.focus();
        return;
      }
    }
    try {
      const r = await fetch(`/.netlify/functions/subscribe?email=${encodeURIComponent(value)}`);
      if (!r.ok) throw new Error("GET failed");
      const j = await r.json();
      if (j.duplicate) {
        showBanner(t.errors.duplicate, "error");
        return;
      }
    } catch {
      showBanner(t.errors.networkError, "error");
      return;
    }
    try {
      const r = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value })
      });
      const j = await r.json();
      if (j.duplicate) {
        showBanner(t.errors.duplicate, "error");
        return;
      }
      if (j.ok) {
        successH2.textContent = t.success;
        successBack.textContent = t.back;
        banner.classList.remove("show");
        swapState("success");
      } else {
        showBanner(t.errors.submitError, "error");
      }
    } catch {
      showBanner(t.errors.networkError, "error");
    }
  });
  backBtn.addEventListener("click", () => {
    emailEl.value = "";
    banner.classList.remove("show");
    swapState("form");
    startRotate();
    applyFormTexts(T[idx]);
    setTimeout(() => emailEl.focus(), FADE_MS);
  });
})();
//# sourceMappingURL=main.js.map
