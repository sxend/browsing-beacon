var plugins = Boolean(process.env['TO_PRODUCTION']) === true ? [uglifyPlugin] : [];
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: "./index.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bb.js"
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: "tslint"
    }],
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },
  devtool: "#source-map"
};

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: {
    except: []
  }
});
