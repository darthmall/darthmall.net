const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const CleanCSS = require('clean-css');
const debug = require('debug')('Eleventy:Benchmark');
const jsonImporter = require('node-sass-json-importer');
const markdownIt = require('markdown-it');
const sass = require('sass');

const collections = require('./utils/collections.js');
const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = function (config) {
  Object.keys(collections).forEach((collectionName) => {
    config.addCollection(collectionName, collections[collectionName]);
  });

  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

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

  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
  });

  config.addWatchTarget("./src/_scss/");

  config.addPairedShortcode('markdown', (data) => md.render(data));

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
