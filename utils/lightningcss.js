const path = require("node:path");
const { statSync } = require("node:fs");

const browserslist = require("browserslist");
const debug = require("debug")("Styles");
const { bundleAsync, browserslistToTargets, transform } = require("lightningcss");

const targets = browserslistToTargets(browserslist("defaults"));

module.exports = function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		async compile(inputContent, inputPath) {
			// Skip any CSS file prefixed with an _.
			const filename = path.basename(inputPath);
			if (filename.startsWith("_")) return;

			debug(inputPath);

			// Track imported CSS files to inform Eleventy of dependencies that should
			// trigger a rebuild of this file when running with --incremental.
			const dependencies = new Set();

			let result;
			try {
				result = await bundleAsync({
					filename: inputPath,
					minify: true,
					sourceMap: true,
					drafts: {
						nesting: true,
					},
					resolver: {
						resolve(specifier, from) {
							let importPath = path.resolve(path.dirname(from), specifier);

							// Look for an _index.css if the import statement is referring to a
							// directory.
							const fileStat = statSync(importPath);
							if (fileStat.isDirectory()) {
								importPath = path.resolve(importPath, "_index.css");
							}

							debug("Importing %s", importPath);

							dependencies.add(importPath);

							return importPath;
						},
					},
					targets,
				});
			} catch (error) {
				debug("Error parsing '%s': %o", inputPath, error);
			}

			this.addDependencies(inputPath, Array.from(dependencies));

			return () => result?.code.toString();
		}
	});

	eleventyConfig.addPairedShortcode("style", function(content, bucket = "default") {
		const result = transform({
			code: Buffer.from(content),
			minify: true,
			drafts: {
				nesting: true,
			},
			targets,
		});

		if (!this.page.style) {
			this.page.style = {};
		}

		if (!this.page.style[bucket]) {
			this.page.style[bucket] = "";
		}

		this.page.style[bucket] += result.code.toString("utf8");

		return "";
	});
};
