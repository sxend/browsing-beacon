(function(Beacon) {
  window.Beacon = Beacon;
  Beacon.configure = function(config) {
    var internal = {
      config: config
    };
    Beacon.Events = require('./events/index.js')(internal);
  };
})(window.Beacon || {});
