__BBPluginCallback("fooPlugin", function(bb, callback) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/plugins?hl=ja
  function FooPlugin(tracker, option) {
    this.tracker = tracker;
    this.option = option;
  }
  FooPlugin.prototype.foo = function() {
    console.log('execute foo plugin method.');
  }
  callback(null, FooPlugin);
});
