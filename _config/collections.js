function feed(collection) {
	return collection
		.getFilteredByGlob([
			"./content/weblog/**/*.md",
			"./content/pages/sketchbook/**/*.md",
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
		.getFilteredByGlob("./content/weblog/**/*.md")
		.filter(livePosts)
		.reverse();
}

function sketches(collection) {
	return collection.getFilteredByGlob("./content/sketchbook/**/*.md").reverse();
}

module.exports = {
	feed,
	posts,
	sketches,
};
