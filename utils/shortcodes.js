const d3 = require("d3");
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
  const b = (minSize - (m * minVw)) / baseFontSize;

  const calc = `calc(${m.toFixed(precision)}vw + ${b.toFixed(precision)}rem)`;

  return `clamp(${range[0]}rem, ${calc}, ${range[1]}rem)`;
}

function copyright() {
  const now = new Date();

  return `&copy; ${now.getUTCFullYear()} ${siteMeta.copyright}`;
}

function formatDate(dt, cls = "") {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (!dt) return '';
  if (!(dt instanceof Date)) dt = new Date(dt);

  const month = MONTHS[dt.getUTCMonth()];
  const readableDate = `${dt.getUTCDate()} ${month} ${dt.getUTCFullYear()}`;

  // Get the ISO formatted date and strip out the time component
  const isoDate = dt.toISOString().substring(0, 10);

  return `<time datetime="${isoDate}" class="${cls}">${readableDate}</time>`;
}

async function picture(src, cls, alt, sizes="(min-width: 45rem) 45rem, 100vw") {
  const options = {
    widths: [300, 600, 720],
    formats: ["avif", "jpg"],
    outputDir: "./_site/img/"
  };

  const metadata = await Image(src, options);

  let attrs = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, attrs);
}

picture.isAsync = true;

function triskaidecagon(size) {
  const NUMSIDES = 13,
        MINPOINTS = 1,
        MAXPOINTS = 4;

  // Generate an array of points for the outer hull of the polygon
  const hull = [];

  const step = Math.PI * 2 / NUMSIDES,
        r = size / 2;

  for (let angle = 0; angle < 2 * Math.PI; angle += step) {
    hull.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }

  // Random functions for generating internal points
  const x = d3.randomUniform(-r, r),
        y = d3.randomUniform(-r, r);

  // Random number of internal points
  const n = d3.randomUniform(MINPOINTS, MAXPOINTS)();

  // Generate the internal points
  const points = [];

  while (points.length < n) {
    const p = [x(), y()];

    if (d3.polygonContains(hull, p)) points.push(p);
  }

  const opacity = d3.scaleLinear().domain([-r, r]).range([1, 0]);

  // Triangles + opacity based on the y-value of the centroid
  const triangles = d3.Delaunay.from([...hull, ...points]).trianglePolygons();

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-${r} -${r} ${size} ${size}">`;

  for (let t of triangles) {
    // Slice off the last point in the triangles because the first and last entry of the
    // array of points is the same.
    const poly = t.slice(0, -1),
          points = poly.map(p => p.join(",")).join(" "),
          [cx, cy] = d3.polygonCentroid(poly);

    svg += `<polygon points="${points}" fill="gold" opacity="${opacity(cy)}"></polygon>`;
  }

  svg += "</svg>";

  return svg;
}

module.exports = {
  clamp,
  copyright,
  formatDate,
  picture,
  triskaidecagon,
};
