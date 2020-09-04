const CleanCSS = require('clean-css');
const debug = require('debug')('Eleventy:Benchmark');
const jsonImporter = require('node-sass-json-importer');
const markdownIt = require('markdown-it');
const sass = require('sass');

const {isoDateFilter, dateFilter} = require('./src/filters/date-filters.js');

module.exports = function (config) {
  const md = markdownIt({
      html: true,
      typographer: true,
    })
    .use(require('markdown-it-anchor'), {
      level: 2,
      permalink: true,
      permalinkSymbol: '§',
      slugify: require('slug'),
    })
    .disable('code');  // Disable code indentation for better inline HTML formatting

  config.setLibrary('md', md);

  config.addWatchTarget("./src/_scss/");

  config.setTemplateFormats('njk,md');

  config.addFilter('dateFilter', dateFilter);
  config.addFilter('isoDateFilter', isoDateFilter);

  config.addFilter('sass', function (file) {
    const output = sass.renderSync({
      file,
      importer: [jsonImporter()]
    });

    return output.css.toString('utf8');
  });

  config.addFilter('cssmin', function (code) {
    const output = new CleanCSS({}).minify(code);

    debug(`Minified CSS: ${Math.round(output.stats.minifiedSize / 102.4) / 10}kb`);

    return output.styles;
  });

  config.addShortcode('triskaidecagon', require('./src/_shortcodes/triskaidecagon.js'));

  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/images');

  const now = new Date();

  const livePosts = post => post.date <= now && !post.data.draft;

  config.addCollection('posts', collection => {
    return collection
      .getFilteredByGlob('./src/weblog/**/*.md')
      .filter(livePosts)
      .filter(post => post.fileSlug !== 'weblog')
      .reverse();
  });

  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: "njk",
  };
}
