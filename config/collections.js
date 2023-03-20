function feed(collection) {
	return collection
		.getFilteredByGlob([
			"./src/weblog/**/*.md",
			"./src/pages/sketchbook/**/*.md",
		])
		.sort((a, b) => {
			if (a.data.date > b.data.date) return -1;
			if (a.data.date < b.data.date) return 1;
			if (a.data.title < b.data.title) return -1;
			if (a.data.title > b.data.title) return 1;
			return 0;
		});
}

function posts(collection) {
	const now = new Date(),
		livePosts = (post) => post.date <= now && !post.data.draft;

	return collection
		.getFilteredByGlob("./src/weblog/**/*.md")
		.filter(livePosts)
		.reverse();
}

function sketches(collection) {
	return collection.getFilteredByGlob("./src/sketchbook/**/*.md").reverse();
}

module.exports = {
	feed,
	posts,
	sketches,
};
