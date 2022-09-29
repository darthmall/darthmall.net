const fs = require('fs');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');
const jsonImporter = require('node-sass-json-importer');
const sass = require('sass');

const collections = require('./utils/collections.js');
const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
const transforms = require('./utils/transforms.js');

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
    const fn = shortcodes[shortcodeName];

    if (fn.isAsync) {
      config.addNunjucksAsyncShortcode(shortcodeName, fn);
    } else {
      config.addShortcode(shortcodeName, fn);
    }
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName]);
  });

  // Markdown
  const md = markdownIt({
      html: true,
      typographer: true,
    })
    .use(anchor, {
      level: [2],
      permalink: anchor.permalink.headerLink()
    })
    .use(require('markdown-it-footnote'))
    .disable('code');  // Disable code indentation for better inline HTML formatting

  config.setLibrary('md', md);

  // I find it handy to be able to write markdown in my Nunjucks templates sometimes, so I
  // have a markdown shortcode for declaring blocks of markdown in Nunjucks.
  config.addPairedShortcode('markdown', (data) => md.render(data));

  config.addPassthroughCopy({ "public": "." });

	config.setBrowserSyncConfig({
		watch: true,
	});

  return {
    dir: {
      input: "src/pages",
      includes: "../includes",
			layouts: "../layouts",
      data: "../data",
    },
    markdownTemplateEngine: "njk",
  };
}
