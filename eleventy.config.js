const fs = require('fs');

const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require('@quasibit/eleventy-plugin-sitemap');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');

const blob = require("./utils/blob.js");
const collections = require('./utils/collections.js');
const filters = require('./utils/filters.js');
const style = require('./utils/style.js');
const shortcodes = require('./utils/shortcodes.js');
const transforms = require('./utils/transforms.js');

module.exports = function (config) {
  // Plugins
  config.addPlugin(style);
  config.addPlugin(pluginRss);
	config.addPlugin(EleventyRenderPlugin);
	config.addPlugin(pluginWebc, {
		components: "src/_components/**/*.webc",
	});
  config.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
  });
  config.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://darthmall.net"
    }
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

  config.addShortcode("blob", blob);

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName]);
  });

	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
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
	config.addFilter('md', (data) => md.render(data));

  config.addPassthroughCopy({ "./public/": "/" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
			layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
  };
}
