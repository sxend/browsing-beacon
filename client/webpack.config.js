var webpack = require('webpack');
var isProductionBuild = process.argv.indexOf('-production') > 0;

var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

var plugins = isProductionBuild ? [minifyPlugin] : [];

var config = {
  context: __dirname + "/scripts",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "browsing-beacon.js"
  },
  plugins: plugins,
  loaders: [{
    test: /\.(js)$/,
    exclude: /node_modules/,
    loader: 'babel?presets[]=es2015'
  }]
};
module.exports = config;
