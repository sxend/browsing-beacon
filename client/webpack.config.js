var webpack = require('webpack');
module.exports = {
  context: __dirname + "/scripts",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "browsing-beacon.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  loaders: [{
    test: /\.(js)$/,
    exclude: /node_modules/,
    loader: 'babel?presets[]=es2015'
  }]
};
