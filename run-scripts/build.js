var webpack = require('webpack');
var npmConfigArgv = JSON.parse(process.env.npm_config_argv);
var config = require('../webpack.config.js');

var compiler = webpack(config);
if (npmConfigArgv.original.indexOf('-w') >= 0) {
  compiler.watch({
    poll: true
  }, webpackHandler);
} else {
  compiler.run(webpackHandler);
}

function webpackHandler(err, stats) {
  if (err) {
    throw err;
  }
  console.log(stats.toString({
    colors: true
  }));
}
