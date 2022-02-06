const prettier = require('prettier');

function formatHtml(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    return prettier.format(content, { parser: 'html' });
  }

  if (outputPath.endsWith('.css')) {
    return prettier.format(content, { parser: 'css' });
  }

  return content;
}

module.exports = {
  formatHtml,
};
