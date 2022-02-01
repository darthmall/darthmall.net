window.toggleTheme = function (event) {
  if (event.target.tagName !== 'BUTTON'
    || !event.target.hasAttribute('data-toggle-theme')) return;

  const theme = event.target.dataset.toggleTheme;
  console.log(`Toggle ${theme}`);
};
