var path = require('path');
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
  context: path.join(__dirname, "../src"),
  entry: "./index.ts",
  output: {
    path: path.join(__dirname, "../dist"),
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
webpack(config, function(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats.toString({
    colors: true
  }));
});
