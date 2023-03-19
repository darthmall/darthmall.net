const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const anchor = require("markdown-it-anchor");
const footnote = require("markdown-it-footnote");

const { feed, posts, sketches } = require("./config/collections.js");
const { webmentionsForUrl } = require("./config/filters.js");
const {
	copyright,
	formatDate,
	picture,
	pubDate,
} = require("./config/shortcodes.js");
const { formatHtml } = require("./config/transforms.js");

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

	// Collections
	config.addCollection("feed", feed);
	config.addCollection("posts", posts);
	config.addCollection("sketches", sketches);

	// Filters
	config.addFilter("webmentionsForUrl", webmentionsForUrl);

	// Shortcodes
	config.addShortcode("copyright", copyright);
	config.addShortcode("formatDate", formatDate);
	config.addShortcode("pubDate", pubDate);

	config.addAsyncShortcode("picture", picture);

	// Transforms
	config.addTransform("formatHtml", formatHtml);

	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
	});

	config.amendLibrary("md", (md) =>
		md
			.use(anchor, {
				level: [2],
				permalink: anchor.permalink.headerLink(),
			})
			.use(footnote)
	);

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
