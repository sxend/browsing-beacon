__BBPluginCallback(function(bb, callback) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/plugins?hl=ja
  function BarPlugin(tracker, option) {
    this.tracker = tracker;
    this.option = option;
  }
  BarPlugin.prototype.bar = function() {
    console.log('execute bar plugin method.');
  }
  callback(null, BarPlugin);
});
