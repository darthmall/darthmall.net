class HomePage {
	data() {
		return {
			title: "Home",
			eleventyExcludeFromCollections: true,
			layout: "index.webc",
			eleventyComputed: {
				pageList: ({ collections, site }) =>
					collections.feed.slice(0, site.recentPostCount),
			},
		};
	}

	render() {
		this.style(`.more-posts > .arrow {
				display: inline-block;
				transition: transform 500ms ease;
			}
			.more-posts:hover > .arrow {
				transform: translateX(0.5ch);
			}`);

		return `<p>
			<a class=more-posts href="/weblog/">
				More Posts
				<span class=arrow aria-hidden=true>&Rarr;</span>
			</a>
		</p>`;
	}
}

module.exports = HomePage;
