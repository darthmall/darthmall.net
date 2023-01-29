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

	render() {
		return `<p><a href="/weblog/">More Posts &Rarr;</a></p>`;
	}
}

module.exports = HomePage;
