(function(Beacon) {
  Beacon.configure = function(config) {
    var internal = {
      config: config
    }
    Beacon.Events = require('./events/index.js')(internal);
  };
  window.Beacon = Beacon;
})(window.Beacon || {});
