function webmentionsForUrl(webmentions, url) {
	return webmentions.children.filter((mention) => {
		return mention["wm-target"] === url && mention["wm-property"] !== "like-of";
	});
}

module.exports = {
	webmentionsForUrl,
};
