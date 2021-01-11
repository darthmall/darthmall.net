const path = require("path");

const site = require("../src/_data/site");

function assetUrl(assetCollection, key) {
  for (let asset of assetCollection) {
    if (asset.data.assetKey === key) {
      return asset.url;
    }
  }

  return "";
}

function dateFilter(value) {
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

  const dt = new Date(value),
    month = MONTHS[dt.getUTCMonth()];

  return `${dt.getUTCDate()} ${month} ${dt.getUTCFullYear()}`;
}

function dirname(pth) {
  return path.dirname(pth);
}

function isoDateFilter(value) {
  const dt = new Date(value);
  return dt.toISOString();
}

function webmentionsForUrl(webmentions, url) {
  return webmentions.children.filter((mention) => mention['wm-target'] === url);
}

module.exports = {
  assetUrl,
  dateFilter,
  dirname,
  isoDateFilter,
  webmentionsForUrl,
};
