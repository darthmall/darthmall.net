const Image = require("@11ty/eleventy-img");

const siteMeta = require("../src/_data/site.json");

function copyright() {
	const now = new Date();

	return `&copy; ${now.getUTCFullYear()} <a href="/about/">${siteMeta.copyright
		}</a>`;
}

function formatDate(dt, cls = "") {
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	if (!dt) return "";
	if (!(dt instanceof Date)) dt = new Date(dt);

	const month = MONTHS[dt.getUTCMonth()];
	const readableDate = `${dt.getUTCDate()} ${month} ${dt.getUTCFullYear()}`;

	// Get the ISO formatted date and strip out the time component
	const isoDate = dt.toISOString().substring(0, 10);

	return `<time datetime="${isoDate}" class="${cls}">${readableDate}</time>`;
}

async function picture(
	src,
	cls,
	alt,
	sizes = "(min-width: 45rem) 45rem, 100vw"
) {
	const options = {
		widths: [400, 600, 800, null],
		formats: ["avif", "jpg"],
		outputDir: "./_site/img/",
	};

	const metadata = await Image(src, options);

	let attrs = {
		class: cls,
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	return Image.generateHTML(metadata, attrs);
}

function pubDate(dateStr) {
	return formatDate(dateStr, "dt-published");
}

module.exports = {
	copyright,
	formatDate,
	picture,
	pubDate,
};
