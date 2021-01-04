function posts(collection) {
  const now = new Date(),
    livePosts = (post) => post.date <= now && !post.data.draft;

  return collection
    .getFilteredByGlob('./src/weblog/**/*.md')
    .filter(livePosts)
    .filter(post => post.fileSlug !== 'weblog')
    .reverse();
}

function work(collection) {
  return collection
    .getFilteredByGlob('./src/work/**/*.md')
    .filter(post => post.fileSlug !== 'work' && !post.data.draft)
    .sort((a, b) => {
      // Sort by the order field first, placing older projects after newer projects
      if (a.data.order > b.data.order) return -1;
      if (a.data.order < b.data.order) return 1;

      // If the order fields are identical fallback to sorting by title
      if (a.data.title < b.data.title) return -1;
      if (a.data.title > b.data.title) return 1;

      return 0;
    })
    .map((p, i, posts) => {
      const prev = posts[i - 1],
            next = posts[i + 1];

      if (prev) p.data.prev = prev.data;
      if (next) p.data.next = next.data;

      return p;
    });
}

module.exports = {
  posts,
  work,
};
