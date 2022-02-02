(function () {
  function init() {
    // Remove the theme toggle if localStorage is not supported, because we
    // can't store the visitor's preferences.
    if (!window.localStorage) {
      const toggles = document.querySelector('.theme-toggle');
      for (let el of toggles) {
        el.remove();
      }
      return;
    }

    const theme = localStorage.getItem(THEME_KEY);
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  const THEME_KEY = 'theme-preference';

  window.toggleTheme = function (event) {
    if (event.target.tagName !== 'BUTTON'
      || !event.target.hasAttribute('data-toggle-theme')) return;

    const theme = event.target.dataset.toggleTheme;
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem(THEME_KEY);
    } else {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem(THEME_KEY, theme);
    }
  };

  init();
})()
