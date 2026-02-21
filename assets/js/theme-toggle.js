// Theme toggle functionality
(function() {
  const THEME_KEY = 'user-theme-preference';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  const ICONS = {
    SUN: '☀',
    MOON: '☾'
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
        button.textContent = ICONS.SUN;
        button.setAttribute('aria-label', 'Switch to light theme');
        button.setAttribute('title', 'Switch to light theme');
      } else {
        button.textContent = ICONS.MOON;
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
        button.addEventListener('click', toggleTheme);
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
