class Sketchbook {
	data() {
		return {
			title: "Sketchbook",
			eleventyExcludeFromCollections: true,
			layout: "index.webc",
			eleventyComputed: {
				pageList: ({ collections }) => collections.sketches,
			},
		};
	}
}

module.exports = Sketchbook;
