const anchor = require("markdown-it-anchor");
const footnote = require("markdown-it-footnote");

module.exports = function(config) {
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
};
