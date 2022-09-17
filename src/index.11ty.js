class HomePage {
	data() {
		return {
			title: "Home",
			eleventyExcludeFromCollections: true,
			layout: "index.njk",
			eleventyComputed: {
				pageList: ({ collections, site }) =>
					collections.feed.slice(0, site.recentPostCount),
			},
		};
	}
}

module.exports = HomePage;
