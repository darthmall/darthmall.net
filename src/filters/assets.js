function assetUrl(assetCollection, fileName) {
  for (const asset of assetCollection) {
    if (asset.fileName === fileName) return asset.url;
  }

  return "";
}

module.exports = {
  assetUrl,
};
