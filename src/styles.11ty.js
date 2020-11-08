class Stylesheet {
  data() {
    return {
      permalink: ({ stylesheet }) => `/css/${stylesheet.fileName}`,
      pagination: {
        alias: "stylesheet",
        data: "styles",
        size: 1,
      },
      tags: ["_styles"],
      layout: "",
    };
  }

  render({ stylesheet }) {
    return stylesheet.contents;
  }
}

module.exports = Stylesheet;
