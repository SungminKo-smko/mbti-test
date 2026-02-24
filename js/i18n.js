/**
 * i18n.js — Automatic Language Detection & Translation Engine
 *
 * Detection priority:
 *   1. localStorage  (user's explicit preference)
 *   2. navigator.language  (browser / OS locale)
 *   3. IP Geolocation via ipapi.co  (country-based fallback, 2 s timeout)
 *   4. Korean  (default)
 *
 * Usage:
 *   await I18n.init();                 // call once on every page
 *   I18n.t('result.complete_title')    // translate a key
 *   I18n.setLanguage('en')             // manual switch + persist
 *   I18n.lang()                        // current language code
 *
 * Events dispatched on window:
 *   'i18n:ready'   { lang, t }   — fired after init() completes
 *   'i18n:changed' { lang, t }   — fired after setLanguage() completes
 */

const I18n = (() => {
  const SUPPORTED   = ['ko', 'en'];
  const DEFAULT     = 'ko';
  const STORAGE_KEY = 'preferred_language';

  // Country-code → language map (expand as more languages are added)
  const CC_MAP = {
    KR: 'ko',
    // English-speaking countries default to 'en' via fallback
  };

  let _lang         = DEFAULT;
  let _cache        = {};   // { 'ko': {...}, 'en': {...} }
  let _initialized  = false;

  // ─────────────────────────────────────────────────────────────────────────
  // Internal helpers
  // ─────────────────────────────────────────────────────────────────────────

  /** Resolve a dot-notation key from a nested object. Returns null if missing. */
  function _get(obj, key) {
    return key.split('.').reduce((o, k) => (o != null ? o[k] : null), obj) ?? null;
  }

  /** Build the path prefix that points to the site root from the current page. */
  function _rootPrefix() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    // Remove trailing filename (contains a dot)
    if (parts.length && parts[parts.length - 1].includes('.')) parts.pop();
    return parts.length ? '../'.repeat(parts.length) : '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Language detection
  // ─────────────────────────────────────────────────────────────────────────

  /** Synchronous detection: localStorage → browser locale → default. */
  function _detectSync() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;

    const nav = (navigator.language || navigator.userLanguage || '')
      .split('-')[0].toLowerCase();
    if (SUPPORTED.includes(nav)) return nav;

    return null; // unknown → will attempt IP geo
  }

  /**
   * Async IP-geolocation refinement.
   * Only called when the browser locale didn't match a supported language.
   */
  async function _detectGeo() {
    try {
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2000);
      const res   = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      clearTimeout(timer);
      const data  = await res.json();
      const cc    = (data.country_code || '').toUpperCase();
      return CC_MAP[cc] || DEFAULT;
    } catch (_) {
      return DEFAULT;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Translation loading
  // ─────────────────────────────────────────────────────────────────────────

  async function _load(lang) {
    if (_cache[lang]) return _cache[lang];
    try {
      const prefix = _rootPrefix();
      const res    = await fetch(`${prefix}locales/${lang}.json`);
      _cache[lang] = await res.json();
    } catch (e) {
      console.warn(`[i18n] Could not load "${lang}" translations.`, e);
      _cache[lang] = {};
    }
    return _cache[lang];
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DOM translation
  // ─────────────────────────────────────────────────────────────────────────

  function _apply(translations) {
    const T = translations;

    // [data-i18n]             → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = _get(T, el.dataset.i18n);
      if (v !== null) el.textContent = v;
    });

    // [data-i18n-html]        → innerHTML  (allows <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = _get(T, el.dataset.i18nHtml);
      if (v !== null) el.innerHTML = v;
    });

    // [data-i18n-placeholder] → placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = _get(T, el.dataset.i18nPlaceholder);
      if (v !== null) el.placeholder = v;
    });

    // [data-i18n-aria]        → aria-label attribute
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = _get(T, el.dataset.i18nAria);
      if (v !== null) el.setAttribute('aria-label', v);
    });

    // <title> tag
    const pageTitle = _get(T, 'page.title');
    if (pageTitle) document.title = pageTitle;

    // <meta name="description">
    const metaEl  = document.querySelector('meta[name="description"]');
    const metaVal = _get(T, 'page.description');
    if (metaEl && metaVal) metaEl.content = metaVal;

    // <html lang="">
    document.documentElement.lang = _lang;

    // Update language-switcher button active states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === _lang);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Initialize i18n on a page.
   * - Detects language (sync first, then geo if needed)
   * - Fetches & caches locale JSON
   * - Applies translations to the DOM
   * - Dispatches 'i18n:ready'
   */
  async function init() {
    let candidate = _detectSync();

    if (!candidate) {
      // Browser locale didn't match — try IP geolocation
      candidate = await _detectGeo();
    }

    _lang = candidate || DEFAULT;

    const T = await _load(_lang);
    _apply(T);
    _initialized = true;

    window.dispatchEvent(new CustomEvent('i18n:ready', { detail: { lang: _lang, t: T } }));
    return _lang;
  }

  /**
   * Manually switch language.
   * Persists the choice to localStorage and re-applies translations.
   * Dispatches 'i18n:changed'.
   */
  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    _lang = lang;
    const T = await _load(lang);
    _apply(T);
    window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang, t: T } }));
  }

  /**
   * Translate a key with optional variable interpolation.
   * Example: I18n.t('result.sms_text', { type: 'INFP', name: 'Dreamer', url: '...' })
   */
  function t(key, vars) {
    const raw = _get(_cache[_lang] || {}, key);
    if (raw === null) return key; // Return key itself as fallback
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (s, [k, v]) => s.replaceAll(`{${k}}`, v),
      raw
    );
  }

  /** Returns the current language code ('ko' | 'en'). */
  function lang() { return _lang; }

  /** Returns true once init() has completed. */
  function isReady() { return _initialized; }

  return { init, setLanguage, t, lang, isReady };
})();
