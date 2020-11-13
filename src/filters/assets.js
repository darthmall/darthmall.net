function assetUrl(assetCollection, key) {
  for (let asset of assetCollection) {
    if (asset.data.assetKey === key) {
      return asset.url;
    }
  }

  return "";
}

module.exports = {
  assetUrl,
};
