const Image = require("@11ty/eleventy-img");

const siteMeta = require("../src/_data/site.json");

function copyright() {
	const now = new Date();

	return `&copy; ${now.getUTCFullYear()} <a href="/about/">${siteMeta.copyright
		}</a>`;
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

module.exports = {
	copyright,
	picture,
};
