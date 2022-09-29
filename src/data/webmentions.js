const fetch = require("node-fetch");

const fs = require("fs");
const path = require("path");

const { chain, uniqueBy } = require("../lib/utils");

const env = require("./env");
const { domain } = require("./site.json");

const API = "https://webmention.io/api";
const CACHE = "_cache/webmentions.json";

function readFromCache() {
	if (fs.existsSync(CACHE)) {
		const data = fs.readFileSync(CACHE);
		return JSON.parse(data);
	}

	return {
		lastFetched: null,
		children: [],
	};
}

function writeToCache(data) {
	const dir = path.dirname(path.resolve(CACHE));
	const contents = JSON.stringify(data, null, 2);

	if (!fs.existsSync(dir)) {
		console.log(`Creating ${dir}`);
		fs.mkdirSync(dir);
	}

	fs.writeFile(CACHE, contents, (err) => {
		if (err) throw err;

		console.log(`Webmentions cached to ${CACHE}`);
	});
}

async function fetchWebmentions(since, perPage = 10000) {
	if (!(env.webmentionIoToken && domain)) {
		console.warn("Unable to fetch webmentions: token and domain are required");
		return null;
	}

	let url = `${API}/mentions.jf2?domain=${domain}&token=${env.webmentionIoToken}&per-page=${perPage}`;

	if (since) url += `&since=${since}`;

	const response = await fetch(url);

	if (!response.ok) return null;

	// FIXME: Should possibly handle multiple pages of web mentions?
	const feed = await response.json();
	console.log(`${feed.children.length} new webmentions fetched`);

	return feed;
}

module.exports = async function () {
	const cache = readFromCache();

	console.log(`${cache.children.length} webmentions loaded from cache`);

	if (env.eleventyEnv !== "production") return cache;

	console.log("Checking for new webmentions...");

	const latest = await fetchWebmentions(cache.lastFetched);
	const mentions = {
		lastFetched: new Date().toISOString(),
		children: [...uniqueBy(chain(latest.children, cache.children), "wm-id")],
	};

	writeToCache(mentions);

	return mentions;
};
