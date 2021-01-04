const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const CleanCSS = require('clean-css');
const debug = require('debug')('Eleventy:Benchmark');
const jsonImporter = require('node-sass-json-importer');
const markdownIt = require('markdown-it');
const sass = require('sass');

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = function (config) {
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
