var webpack = require('webpack');

var toProduction = !!process.env['TO_PRODUCTION'];
var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: {
    except: []
  }
});

var plugins = toProduction ? [minifyPlugin] : [];

var config = {
  context: __dirname + "/scripts",
  entry: "./index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bb.js"
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015'
    }, {
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },
  devtool: "#source-map"
};
module.exports = config;
