const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownConfig = require("./_config/markdown.config.js");

const { feed, posts, sketches } = require("./_config/collections.js");
const { webmentionsForUrl } = require("./_config/filters.js");
const { formatHtml } = require("./_config/transforms.js");

const { copyright, picture, time } = require("./_config/shortcodes.js");

module.exports = function(config) {
	// Plugins
	config.addPlugin(pluginBundle);
	config.addPlugin(pluginRss);
	config.addPlugin(EleventyRenderPlugin);
	config.addPlugin(pluginWebc, {
		components: "_includes/**/*.webc",
	});
	config.addPlugin(syntaxHighlight, {
		templateFormats: ["njk", "liquid", "md"],
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
	config.addShortcode("time", time);

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
			input: "content",
			includes: "../_includes",
			layouts: "../_layouts",
			data: "../_data",
		},
		htmlTemplateEngine: false,
		markdownTemplateEngine: "njk",
	};
};
