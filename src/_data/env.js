require("dotenv").config();

module.exports = {
  eleventyEnv: process.env.ELEVENTY_ENV,
  webmentionIoToken: process.env.WEBMENTION_IO_TOKEN,
};
