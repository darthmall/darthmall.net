class Stylesheet {
  data() {
    return {
      eleventyComputed: {
        assetKey: ({ stylesheet }) => stylesheet.fileName,
      },
      permalink: ({ stylesheet }) => `/css/${stylesheet.fileName}`,
      pagination: {
        addAllPagesToCollections: true,
        alias: "stylesheet",
        data: "styles",
        size: 1,
      },
      layout: "",
      tags: ["_styles"]
    };
  }

  render({ stylesheet }) {
    return stylesheet.content;
  }
}

module.exports = Stylesheet;
