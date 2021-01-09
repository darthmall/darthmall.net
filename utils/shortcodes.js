const d3 = require("d3");

const siteMeta = require("../src/_data/site.json");

function copyright() {
  const now = new Date();

  return `&copy; ${now.getUTCFullYear()} ${siteMeta.copyright}`;
}

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
  copyright,
  triskaidecagon,
};
