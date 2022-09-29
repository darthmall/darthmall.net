class Weblog {
	data() {
		return {
			title: "Weblog",
			eleventyExcludeFromCollections: true,
			layout: "index.njk",
			eleventyComputed: {
				pageList: ({ collections }) => collections.posts,
			},
		};
	}
}

module.exports = Weblog;
