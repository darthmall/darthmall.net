module.exports = {
  async onPreBuild({ utils }) {
    await utils.cache.restore("./_cache");
  },

  async onPostBuild({ utils }) {
    await utils.cache.save("./_cache");
  }
};
