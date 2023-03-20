const prettier = require("prettier");

function formatHtml(content, outputPath) {
	if (outputPath.endsWith(".html")) {
		return prettier.format(content, { parser: "html" });
	}

	return content;
}

module.exports = {
	formatHtml,
};
