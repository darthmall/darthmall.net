class Weblog {
	data() {
		return {
			title: "Weblog",
			eleventyExcludeFromCollections: true,
			layout: "index.liquid",
			eleventyComputed: {
				pageList: ({ collections }) => collections.posts,
			},
		};
	}
}

module.exports = Weblog;
