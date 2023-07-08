class Sketchbook {
	data() {
		return {
			title: "Sketchbook",
			eleventyExcludeFromCollections: true,
			layout: "index.liquid",
			eleventyComputed: {
				pageList: ({ collections }) => collections.sketches,
			},
		};
	}
}

module.exports = Sketchbook;
