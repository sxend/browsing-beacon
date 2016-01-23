var webpack = require('webpack');

var toProduction =  !!process.env['TO_PRODUCTION'];
var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

var plugins = toProduction ? [minifyPlugin] : [];

var config = {
  context: __dirname + "/scripts",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bb.js"
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015'
    }]
  },
  devtool: "#source-map"
};
module.exports = config;
