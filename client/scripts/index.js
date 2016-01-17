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
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return F;
  }

  function createCallbackCaller() {
    return {
      emit: function(task) {
        emitter.emit(internal.config.endpoint, task);
      }
    };
  }
  Beacon.Event.register = function(newEvent) {
    Beacon.Events[newEvent.name] = createEventConstructor(newEvent.handler);
  }
  Beacon.Event.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler(element, context, function() {
        callback.bind(createCallbackCaller())(element, context);
      });
    });
  }

  Beacon.Event.register(require('./events/inview.js'));

  window.Beacon = Beacon;
})(window.Beacon || {});
