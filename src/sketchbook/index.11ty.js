class Sketchbook {
	data() {
		return {
			title: "Sketchbook",
			eleventyExcludeFromCollections: true,
			layout: "index.njk",
			eleventyComputed: {
				pageList: ({ collections }) => collections.sketches
			}
		};
	}
}

module.exports = Sketchbook;
