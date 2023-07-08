class Weblog {
	data() {
		return {
			title: "Weblog",
			eleventyExcludeFromCollections: true,
			layout: "index.webc",
			eleventyComputed: {
				pageList: ({ collections }) => collections.posts,
			},
		};
	}
}

module.exports = Weblog;
