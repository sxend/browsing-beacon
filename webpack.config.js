var path = require('path');
var webpack = require('webpack');
module.exports = function(toProduction) {
  var plugins = [];
  if (toProduction) {
    plugins.push(uglifyPlugin());
  }
  return {
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
}

function uglifyPlugin() {
  return new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: []
    }
  });
}
