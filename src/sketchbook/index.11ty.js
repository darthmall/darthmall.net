class Sketchbook {
	data() {
		return {
			title: "Sketchbook",
			eleventyExcludeFromCollections: true,
			layout: "layouts/index.njk",
			eleventyComputed: {
				pageList: ({ collections }) => collections.sketches
			}
		};
	}
}

module.exports = Sketchbook;
