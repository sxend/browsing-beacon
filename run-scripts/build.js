var webpack = require('webpack');
var toProduction = !!process.env['TO_PRODUCTION'];
var config = require('./webpack.config.js')(toProduction);

webpack(config, function(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats.toString({
    colors: true
  }));
});
