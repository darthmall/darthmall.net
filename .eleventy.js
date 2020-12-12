const path = require("path");

const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const CleanCSS = require('clean-css');
const debug = require('debug')('Eleventy:Benchmark');
const jsonImporter = require('node-sass-json-importer');
const markdownIt = require('markdown-it');
const sass = require('sass');

const {isoDateFilter, dateFilter} = require('./src/filters/date-filters.js');
const { assetUrl } = require("./src/filters/assets.js");

module.exports = function (config) {
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

  config.addFilter("assetUrl", assetUrl);
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('isoDateFilter', isoDateFilter);

  config.addFilter('sass', function (file) {
    const output = sass.renderSync({
      file,
      importer: [jsonImporter()]
    });

    return output.css.toString('utf8');
  });

  config.addFilter('dirname', (pth) => path.dirname(pth));

  config.addFilter('cssmin', function (code) {
    const output = new CleanCSS({}).minify(code);

    debug(`Minified CSS: ${Math.round(output.stats.minifiedSize / 102.4) / 10}kb`);

    return output.styles;
  });

  config.addShortcode('triskaidecagon', require('./src/_shortcodes/triskaidecagon.js'));

  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/img');

  const now = new Date();

  const livePosts = post => post.date <= now && !post.data.draft;

  config.addCollection('posts', collection => {
    return collection
      .getFilteredByGlob('./src/weblog/**/*.md')
      .filter(livePosts)
      .filter(post => post.fileSlug !== 'weblog')
      .reverse();
  });

  config.addCollection('work', collection => {
    return collection
      .getFilteredByGlob('./src/work/**/*.md')
      .filter(post => post.fileSlug !== 'work' && !post.data.draft)
      .sort((a, b) => {
        // Sort by the order field first, placing older projects after newer projects
        if (a.data.order > b.data.order) return -1;
        if (a.data.order < b.data.order) return 1;

        // If the order fields are identical fallback to sorting by title
        if (a.data.title < b.data.title) return -1;
        if (a.data.title > b.data.title) return 1;

        return 0;
      })
      .map((p, i, posts) => {
        const prev = posts[i - 1],
              next = posts[i + 1];

        if (prev) p.data.prev = prev.data;
        if (next) p.data.next = next.data;

        return p;
      });
  });

  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: "njk",
  };
}
