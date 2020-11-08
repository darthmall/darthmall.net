const path = require("path");

const glob = require("glob");
const sass = require("sass");
const jsonImporter = require("node-sass-json-importer");

module.exports = function styles() {
  return glob.sync("src/_scss/[^_]*.scss").map(function (file) {
    const fileName = path.basename(file, ".scss");

    const output = sass.renderSync({
      file,
      importer: [jsonImporter()],
    });

    return {
      fileName: `${fileName}.css`,
      contents: output.css.toString("utf8"),
    };
  });
};
