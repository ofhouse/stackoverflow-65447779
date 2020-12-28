const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const { getPlugin, pluginByName } = require("@craco/craco/lib/webpack-plugins")
const absolutePath = path.join(__dirname, "../components");
module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat([absolutePath]);
      }

      // Change context of ESLint Webpack Plugin
      const { match: eslintPlugin } = getPlugin(webpackConfig, pluginByName("ESLintWebpackPlugin"));
      eslintPlugin.options['context'] = path.join(__dirname, "../../")

      return webpackConfig;
    }
  }
};