const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');

const collections = require('./utils/collections.js');
const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = function (config) {
  // Plugins
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    config.addCollection(collectionName, collections[collectionName]);
  });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Markdown
  const md = markdownIt({
      html: true,
      typographer: true,
    })
    .use(require('markdown-it-anchor'), {
      level: [2],
      permalink: true,
      permalinkSymbol: '§',
      slugify: require('slug'),
    })
    .disable('code');  // Disable code indentation for better inline HTML formatting

  config.setLibrary('md', md);

  // I find it handy to be able to write markdown in my Nunjucks templates sometimes, so I
  // have a markdown shortcode for declaring blocks of markdown in Nunjucks.
  config.addPairedShortcode('markdown', (data) => md.render(data));

  // Rebuild when the styles change
  config.addWatchTarget("./src/_scss/");

  // Don't mess with this stuff, just pass it on through
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/img');

  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: "njk",
  };
}
