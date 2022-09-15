class Weblog {
	data() {
		return {
			title: "Weblog",
			eleventyExcludeFromCollections: true,
			layout: "layouts/index.njk",
			eleventyComputed: {
				pageList: ({ collections }) => collections.posts,
			},
		};
	}
}

module.exports = Weblog;
