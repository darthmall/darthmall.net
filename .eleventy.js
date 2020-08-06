const CleanCSS = require('clean-css');

const {isoDateFilter, dateFilter} = require('./src/filters/date-filters.js');

module.exports = function (config) {
  config.setTemplateFormats('njk,md');

  config.addFilter('dateFilter', dateFilter);
  config.addFilter('isoDateFilter', isoDateFilter);

  config.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');

  const now = new Date();

  const livePosts = post => post.date <= now && !post.data.draft;

  config.addCollection('posts', collection => {
    return collection
      .getFilteredByGlob('./src/posts/**/*.md')
      .filter(livePosts)
      .reverse();
  });

  return {
    dir: {
      input: 'src',
    },
  };
}
