class Stylesheet {
  data() {
    return {
      eleventyComputed: {
        assetKey: ({ stylesheet }) => stylesheet.fileName,
      },
      permalink: ({ stylesheet }) => {
        return `/css/${stylesheet.hashedFileName}`
      },
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
