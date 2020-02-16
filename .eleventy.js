module.exports = function (config) {
  config.setTemplateFormats('njk,md');

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/img');

  return {
    dir: {
      input: 'src',
    },
  };
}
