const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownConfig = require("./config/markdown.config.js");

const { feed, posts, sketches } = require("./config/collections.js");
const { webmentionsForUrl } = require("./config/filters.js");
const { formatHtml } = require("./config/transforms.js");

const { copyright, picture } = require("./config/shortcodes.js");

module.exports = function(config) {
	// Plugins
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
			hostname: "https://darthmall.net",
		},
	});

	// Markdown config
	config.addPlugin(markdownConfig);

	// Collections
	config.addCollection("feed", feed);
	config.addCollection("posts", posts);
	config.addCollection("sketches", sketches);

	// Filters
	config.addFilter("webmentionsForUrl", webmentionsForUrl);

	// Shortcodes
	config.addShortcode("copyright", copyright);

	config.addAsyncShortcode("picture", picture);

	// Transforms
	config.addTransform("formatHtml", formatHtml);

	config.setServerPassthroughCopyBehavior("passthrough");
	config.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism.css": "/css/prism.css",
		"./node_modules/prismjs/themes/prism-tomorrow.css":
			"/css/prism-tomorrow.css",
	});

	return {
		dir: {
			input: "src",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data",
		},
		markdownTemplateEngine: "njk",
	};
};
