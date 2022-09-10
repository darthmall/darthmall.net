const path = require("path");

const site = require("../src/_data/site");

function assetUrl(assetCollection, key) {
	for (let asset of assetCollection) {
		if (asset.data.assetKey === key) {
			return asset.url;
		}
	}

	return "";
}

function dirname(pth) {
	return path.dirname(pth);
}

function webmentionsForUrl(webmentions, url) {
	return webmentions.children.filter((mention) => {
		return mention["wm-target"] === url && mention["wm-property"] !== "like-of";
	});
}

module.exports = {
	assetUrl,
	dirname,
	webmentionsForUrl,
};
