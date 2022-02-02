(function () {
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
})()
