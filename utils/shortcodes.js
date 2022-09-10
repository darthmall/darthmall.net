const Image = require("@11ty/eleventy-img");

const siteMeta = require("../src/_data/site.json");

/**
 * Return a clamp() expression for a responsive size.
 */
function clamp(viewport, range, baseFontSize = 16, precision = 4) {
	const dVw = (viewport[1] - viewport[0]) / 100;
	const minVw = viewport[0] / 100;
	const dSize = (range[1] - range[0]) * baseFontSize;
	const minSize = range[0] * baseFontSize;

	// Slope of the line from the smallest font size at the smallest viewport to
	// the largest font size at the largest viewport
	const m = dSize / dVw;

	// y-intercept of the line: font size when the viewport width is 0
	const b = (minSize - m * minVw) / baseFontSize;

	const calc = `calc(${m.toFixed(precision)}vw + ${b.toFixed(precision)}rem)`;

	return `clamp(${range[0]}rem, ${calc}, ${range[1]}rem)`;
}

function copyright() {
	const now = new Date();

	return `&copy; ${now.getUTCFullYear()} ${siteMeta.copyright}`;
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

picture.isAsync = true;

module.exports = {
	clamp,
	copyright,
	formatDate,
	picture,
};
