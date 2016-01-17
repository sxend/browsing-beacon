(function(Beacon) {
  var internal = {
    config: {
      endpoint: null,
      batchInterval: 1000
    }
  }

  var emitter = require('./emitter.js')(internal.config.batchInterval);

  Beacon.Events = {};
  Beacon.Event = {};

  Beacon.configure = function(config) {
    internal.config = config;
  };

  function createEventConstructor(handler) {
    function F(eventConfig) {
      if (!(this instanceof F)) return new F(eventConfig);
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return F;
  }

  function messageCallback(message) {
    emitter.emit(internal.config.endpoint, message);
  }
  Beacon.Event.register = function(newEvent) {
    Beacon.Events[newEvent.name] = createEventConstructor(newEvent.handler);
  }
  Beacon.Event.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler.bind(context)(element, function(event) {
        callback.bind(context)(element, event, messageCallback);
      });
    });
  }

  Beacon.Event.register(require('./events/inview.js'));

  window.Beacon = Beacon;
})(window.Beacon || {});
