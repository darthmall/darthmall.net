const prettier = require('prettier');

function formatHtml(content, outputPath) {
  return outputPath.endsWith('.html') ?
    prettier.format(content, { parser: 'html' }) :
    content;
}

module.exports = {
  formatHtml,
};
