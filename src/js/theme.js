(function () {
  const TOGGLE_CLASS = '.theme-toggle';
  const THEME_KEY = 'theme-preference';

  function init() {
    // Remove the theme toggle if localStorage is not supported, because we
    // can't store the visitor's preferences.
    if (!window.localStorage) {
      const toggles = document.querySelector(TOGGLE_CLASS);
      for (let el of toggles) {
        el.remove();
      }
      return;
    }

    const theme = localStorage.getItem(THEME_KEY);
    if (theme) {
      toggleTheme(theme)
    }

    window.onThemeToggle = onThemeToggle;
  }

  function onThemeToggle(event) {
    if (event.target.tagName !== 'BUTTON'
      || !event.target.hasAttribute('data-toggle-theme')) return;

    toggleTheme(event.target.getAttribute('data-toggle-theme'));
  }

  function toggleTheme(theme) {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem(THEME_KEY);
    } else {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem(THEME_KEY, theme);
    }

    // Update UI
    document.querySelectorAll(
      `${TOGGLE_CLASS} [data-toggle-theme]`
    ).forEach(function (el) {
      if (el.getAttribute('data-toggle-theme') === theme) {
        el.setAttribute('aria-pressed', 'true');
      } else {
        el.removeAttribute('aria-pressed');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})()
