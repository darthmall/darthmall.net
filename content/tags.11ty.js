class TagPage {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			pagination: {
				data: "collections",
				size: 1,
				alias: "tag",
				filter: ["all", "feed", "portfolio", "posts", "recent", "sketches"],
			},
			layout: "index.liquid",
			eleventyComputed: {
				permalink: ({ tag }) => `/tags/${tag}/`,
				title: ({ tag }) => tag,
				pageList: ({ collections, tag }) => collections[tag].slice().reverse(),
			},
		};
	}
}

module.exports = TagPage;
