module.exports = function (config) {
  config.setTemplateFormats('njk,md');

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');

  return {
    dir: {
      input: 'src',
    },
  };
}
