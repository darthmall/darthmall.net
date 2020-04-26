const {isoDateFilter, dateFilter} = require('./src/filters/date-filters.js');

module.exports = function (config) {
  config.setTemplateFormats('njk,md');

  config.addFilter('dateFilter', dateFilter);
  config.addFilter('isoDateFilter', isoDateFilter);

  config.addPassthroughCopy('src/css');
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
