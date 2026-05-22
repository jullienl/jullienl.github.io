# Google Translate Button — Implementation Guide

This document describes how to add an in-place Google Translate dropdown button to a Jekyll (or any static HTML) website. The translation happens on the same page without redirecting to an external URL, and the button/menu itself is never translated.

---

## Overview

- Uses the **Google Translate Element API** (free, no API key needed).
- Translation happens **in-place** on the same page (no new tab, no redirect).
- The dropdown button and language list are **excluded from translation** (`notranslate` / `translate="no"`).
- Language names are shown in their **native language** (e.g., Español, Français, 日本語).
- An **English (original)** entry at the top lets users reset back to the original page language.
- The Google Translate toolbar that normally appears at the top of the page is **hidden**.
- Translation state is **cleared on every page load** to prevent carry-over when navigating between pages.
- Works with **dark mode / light mode** theming.

---

## Step 1 — Create the shared HTML include

Create a file (e.g., `_includes/custom/translate.html` for Jekyll, or any reusable HTML partial) with the following content:

```html
<!-- Hidden Google Translate widget (translated in-place, same tab) -->
<div id="google_translate_element" style="display:none"></div>
<script>
  function clearGoogTransCookie() {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname + ';';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname + ';';
  }
  function resetTranslation() {
    var sel = document.querySelector('#google_translate_element select.goog-te-combo');
    if (sel) { sel.value = ''; sel.dispatchEvent(new Event('change')); }
  }
  clearGoogTransCookie();

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
  }
  function doTranslate(lang) {
    document.getElementById('post-translate').classList.remove('post-translate--open');
    var sel = document.querySelector('#google_translate_element select.goog-te-combo');
    if (sel) {
      sel.value = lang;
      sel.dispatchEvent(new Event('change'));
    }
  }
  // Reset translation when navigating back via browser (bfcache)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearGoogTransCookie();
      resetTranslation();
    }
  });
  // Remove Google Translate top bar and body offset after translation
  var _gtObserver = new MutationObserver(function() {
    var bar = document.querySelector('.goog-te-banner-frame, #goog-gt-tt, .skiptranslate > iframe');
    if (bar) bar.style.display = 'none';
    if (document.body.style.top) document.body.style.top = '';
    if (document.body.style.marginTop) document.body.style.marginTop = '';
  });
  _gtObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
</script>
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async></script>

<!-- translate="no" and class="notranslate" prevent Google from translating the button/menu itself -->
<div class="post-translate notranslate" id="post-translate" translate="no">
  <button class="post-translate-btn" onclick="document.getElementById('post-translate').classList.toggle('post-translate--open')" aria-haspopup="true">
    🌐 Translate ▾
  </button>
  <ul class="post-translate-menu" role="menu">
    <li role="menuitem"><a onclick="doTranslate(''); return false;" href="#">🇬🇧 English (original)</a></li>
    <li class="post-translate-separator" role="separator"></li>
    <li role="menuitem"><a onclick="doTranslate('es'); return false;" href="#">🇪🇸 Español</a></li>
    <li role="menuitem"><a onclick="doTranslate('fr'); return false;" href="#">🇫🇷 Français</a></li>
    <li role="menuitem"><a onclick="doTranslate('de'); return false;" href="#">🇩🇪 Deutsch</a></li>
    <li role="menuitem"><a onclick="doTranslate('it'); return false;" href="#">🇮🇹 Italiano</a></li>
    <li role="menuitem"><a onclick="doTranslate('pt'); return false;" href="#">🇧🇷 Português</a></li>
    <li role="menuitem"><a onclick="doTranslate('nl'); return false;" href="#">🇳🇱 Nederlands</a></li>
    <li role="menuitem"><a onclick="doTranslate('pl'); return false;" href="#">🇵🇱 Polski</a></li>
    <li role="menuitem"><a onclick="doTranslate('ru'); return false;" href="#">🇷🇺 Русский</a></li>
    <li role="menuitem"><a onclick="doTranslate('zh-CN'); return false;" href="#">🇨🇳 中文（简体）</a></li>
    <li role="menuitem"><a onclick="doTranslate('zh-TW'); return false;" href="#">🇹🇼 中文（繁體）</a></li>
    <li role="menuitem"><a onclick="doTranslate('ja'); return false;" href="#">🇯🇵 日本語</a></li>
    <li role="menuitem"><a onclick="doTranslate('ko'); return false;" href="#">🇰🇷 한국어</a></li>
    <li role="menuitem"><a onclick="doTranslate('ar'); return false;" href="#">🇸🇦 العربية</a></li>
    <li role="menuitem"><a onclick="doTranslate('hi'); return false;" href="#">🇮🇳 हिन्दी</a></li>
    <li role="menuitem"><a onclick="doTranslate('tr'); return false;" href="#">🇹🇷 Türkçe</a></li>
    <li role="menuitem"><a onclick="doTranslate('sv'); return false;" href="#">🇸🇪 Svenska</a></li>
    <li role="menuitem"><a onclick="doTranslate('da'); return false;" href="#">🇩🇰 Dansk</a></li>
    <li role="menuitem"><a onclick="doTranslate('fi'); return false;" href="#">🇫🇮 Suomi</a></li>
    <li role="menuitem"><a onclick="doTranslate('nb'); return false;" href="#">🇳🇴 Norsk</a></li>
    <li role="menuitem"><a onclick="doTranslate('cs'); return false;" href="#">🇨🇿 Čeština</a></li>
    <li role="menuitem"><a onclick="doTranslate('sk'); return false;" href="#">🇸🇰 Slovenčina</a></li>
    <li role="menuitem"><a onclick="doTranslate('hu'); return false;" href="#">🇭🇺 Magyar</a></li>
    <li role="menuitem"><a onclick="doTranslate('ro'); return false;" href="#">🇷🇴 Română</a></li>
    <li role="menuitem"><a onclick="doTranslate('uk'); return false;" href="#">🇺🇦 Українська</a></li>
    <li role="menuitem"><a onclick="doTranslate('th'); return false;" href="#">🇹🇭 ภาษาไทย</a></li>
    <li role="menuitem"><a onclick="doTranslate('vi'); return false;" href="#">🇻🇳 Tiếng Việt</a></li>
    <li role="menuitem"><a onclick="doTranslate('id'); return false;" href="#">🇮🇩 Bahasa Indonesia</a></li>
    <li role="menuitem"><a onclick="doTranslate('ms'); return false;" href="#">🇲🇾 Bahasa Melayu</a></li>
    <li role="menuitem"><a onclick="doTranslate('he'); return false;" href="#">🇮🇱 עברית</a></li>
    <li role="menuitem"><a onclick="doTranslate('el'); return false;" href="#">🇬🇷 Ελληνικά</a></li>
  </ul>
</div>
<script>
  // Close the dropdown when clicking outside of it
  document.addEventListener('click', function(e) {
    var el = document.getElementById('post-translate');
    if (el && !el.contains(e.target)) el.classList.remove('post-translate--open');
  });
</script>
```

---

## Step 2 — Add the CSS

Add the following rules to your stylesheet (e.g., `style.scss` or `style.css`). Replace the accent colour `#03a883` with your own brand colour if needed.

```css
/* ── Translate custom dropdown ── */
.post-translate {
  position: relative;
  display: inline-block;
  margin: 0.5em 0 1.5em 0;   /* bottom margin creates space before the next section */
}

.post-translate-btn {
  background: none;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 0.85rem;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
}

.post-translate-btn:hover {
  border-color: #03a883;
  color: #03a883;
}

.post-translate-menu {
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  max-height: 260px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  border: 1px solid #444;
  border-top: 2px solid #03a883;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  z-index: 2000;
  background-color: var(--minima-background-color, #fff);
}

.post-translate--open .post-translate-menu {
  display: block;
}

.post-translate-menu li {
  margin: 0;
  padding: 0;
}

/* Separator between English (original) and translated languages */
.post-translate-separator {
  height: 1px;
  background-color: #ccc;
  margin: 4px 0;
}

[data-theme="dark"] .post-translate-separator {
  background-color: #30363d;
}

.post-translate-menu li a {
  display: block;
  padding: 5px 14px;
  font-size: 0.85rem;
  color: inherit !important;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}

.post-translate-menu li a:hover {
  background-color: #03a883;
  color: #fff !important;
}

/* Dark mode override */
[data-theme="dark"] .post-translate-menu {
  background-color: #161b22 !important;
  border-color: #30363d !important;
  border-top-color: #03a883 !important;
}

/* Light mode override */
[data-theme="light"] .post-translate-menu {
  background-color: #ffffff !important;
  border-color: #d1d5db !important;
  border-top-color: #03a883 !important;
}

/* Prevent Google Translate from pushing the page down */
body.translated-ltr,
body.translated-rtl {
  top: 0 !important;
}

/* Hide the Google Translate toolbar entirely */
.goog-te-banner-frame,
#goog-gt-tt,
.goog-te-balloon-frame {
  display: none !important;
}
```

> **Note on dark/light mode:** The CSS above uses `[data-theme="dark"]` / `[data-theme="light"]` attribute selectors. Adjust these selectors to match how your site applies theming (e.g., `.dark-mode`, `body.dark`, `html.dark`, etc.).

---

## Step 3 — Include the widget in your page layouts

### Jekyll

In each layout file where you want the button (e.g., `_layouts/post.html`, `_layouts/home.html`), add the include at the position where you want the button to appear:

```liquid
{% include custom/translate.html %}
```

### Plain HTML

Paste the full HTML block from Step 1 directly into the page at the desired location.

---

## Step 4 — Exclude your site header from translation (optional but recommended)

If your site has a navigation header that you don't want translated, add `class="notranslate"` and `translate="no"` to the header element:

```html
<header class="site-header notranslate" translate="no">
  ...
</header>
```

---

## How it works

| Concern | Solution |
|---|---|
| In-place translation (no redirect) | Google Translate Element API with `autoDisplay: false`; language selected programmatically |
| Google toolbar hidden | CSS `display: none` on `.goog-te-banner-frame` + MutationObserver strips injected `body` `top`/`marginTop` styles |
| Menu not translated | `translate="no"` + `class="notranslate"` on the wrapper `<div>` |
| Translation carries over when navigating back | `googtrans` cookie cleared on every page load and on `pageshow` with `e.persisted` (bfcache) |
| Dark/light mode support | Explicit CSS overrides for both theme states |

---

## Notes

- **Flag emoji on Windows/Chrome**: Windows does not include flag emoji in its system fonts; Chrome uses OS fonts, so flags may not render. This is a known OS limitation and cannot be fixed without loading an emoji font like [Twemoji](https://github.com/twitter/twemoji).
- **`pageLanguage`**: Set `pageLanguage: 'en'` to match the source language of your site. Change it if your site is in a different language.
- **Accent colour**: Replace `#03a883` throughout the CSS with your own brand/accent colour.
