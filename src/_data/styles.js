const crypto = require("crypto");
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

    const content = output.css.toString("utf8"),
      hash = crypto.createHash("md5");

    hash.update(content);

    return {
      fileName: `${fileName}.css`,
      hashedFileName: `${fileName}-${hash.digest("hex").slice(0, 10)}.css`,
      content: content,
    };
  });
};
