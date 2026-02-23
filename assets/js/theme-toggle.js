// Theme toggle functionality
(function() {
  const THEME_KEY = 'user-theme-preference';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  const ICONS = {
    SUN: '<svg class="theme-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1.5" x2="12" y2="4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="19.5" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1.5" y1="12" x2="4.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="19.5" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    MOON: '<svg class="theme-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M20.9 14.2a8.7 8.7 0 1 1-11.1-11.1A9.5 9.5 0 0 0 20.9 14.2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
  };

  function getGiscusTheme(theme) {
    return theme === THEMES.DARK ? 'dark_dimmed' : 'light';
  }

  function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (!giscusFrame || !giscusFrame.contentWindow) return;

    giscusFrame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: getGiscusTheme(theme) } } },
      'https://giscus.app'
    );
  }

  function syncGiscusTheme(theme) {
    updateGiscusTheme(theme);
    setTimeout(() => updateGiscusTheme(theme), 150);
    setTimeout(() => updateGiscusTheme(theme), 600);
  }

  function bindGiscusFrameTheme() {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (!giscusFrame || giscusFrame.dataset.themeBound === 'true') return;

    giscusFrame.dataset.themeBound = 'true';
    giscusFrame.addEventListener('load', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
      syncGiscusTheme(currentTheme);
    });
  }

  function observeGiscus() {
    const observer = new MutationObserver(() => {
      const giscusFrame = document.querySelector('iframe.giscus-frame');
      if (!giscusFrame) return;

      bindGiscusFrameTheme();
      const currentTheme = document.documentElement.getAttribute('data-theme') || getCurrentTheme();
      syncGiscusTheme(currentTheme);
      observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Get current theme from localStorage or default to system preference
  function getCurrentTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
  }

  // Apply theme by setting data attribute on html element
  function applyTheme(theme) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleButton(theme);
    syncGiscusTheme(theme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }

  // Update the toggle button icon
  function updateToggleButton(theme) {
    const buttons = [
      document.getElementById('theme-toggle'),
      document.getElementById('theme-toggle-header')
    ];

    buttons.forEach(button => {
      if (!button) return;

      if (theme === THEMES.DARK) {
        button.innerHTML = ICONS.SUN;
        button.setAttribute('aria-label', 'Switch to light theme');
        button.setAttribute('title', 'Switch to light theme');
      } else {
        button.innerHTML = ICONS.MOON;
        button.setAttribute('aria-label', 'Switch to dark theme');
        button.setAttribute('title', 'Switch to dark theme');
      }
    });
  }

  // Toggle between themes
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    applyTheme(newTheme);
  }

  function closeMobileMenu() {
    const navTrigger = document.getElementById('nav-trigger');
    if (navTrigger && navTrigger.checked) {
      navTrigger.checked = false;
    }
  }

  // Initialize theme on page load
  function initTheme() {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    bindGiscusFrameTheme();
    observeGiscus();

    // Add click event to both toggle buttons
    const buttons = [
      document.getElementById('theme-toggle'),
      document.getElementById('theme-toggle-header')
    ];

    buttons.forEach(button => {
      if (button) {
        button.addEventListener('click', (event) => {
          toggleTheme();
          if (event.currentTarget && event.currentTarget.id === 'theme-toggle-header') {
            closeMobileMenu();
          }
        });
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
