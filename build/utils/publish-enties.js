const glob = require('glob');
const { resolve } = require('path');
const srcPath = resolve(__dirname, '../../src');
module.exports = findPublishEntries;
function findPublishEntries () {
  const entries = {
  };
    // 实现按需加载
  glob.sync('components/**/index.vue', { cwd: srcPath }).forEach(function (path) {
    const componentMatcher = path.match(/components\/(.+)\/index.vue$/);
    const componetName = componentMatcher[1];
    entries[`/${componetName}`] = resolve(__dirname, '../../src/components/', `${componetName}/index.vue`);
  });
  glob.sync('plugins/*.js', { cwd: srcPath }).forEach(function (path) {
    const pluginsMatcher = path.match(/plugins\/(.+)\.js$/);
    const pluginName = pluginsMatcher[1];
    entries[`/${pluginName}-plugin`] = resolve(__dirname, '../../src/plugins/', `${pluginName}.js`);
  });
  return entries;
}
