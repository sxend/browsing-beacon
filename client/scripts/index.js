(function(Beacon) {
  var internal = {
    config: {
      endpoint: null,
      batchInterval: 1000
    }
  }
  Beacon.Events = {};
  Beacon.Event = {};

  function generateEvent(handler) {
    function F(eventConfig) {
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return F;
  }

  function generateBindObject(element) {
    return {
      element: element,
      emit: function(value) {
        console.log(value);
      }
    };
  }
  Beacon.Event.register = function(newEvent) {
    Beacon.Events[newEvent.name] = generateEvent(newEvent.handler);
  }
  Beacon.Event.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      console.log('watch start.' + target.querySelector);
      var context = {};
      target.handler(element, context, callback);
    });
  }
  Beacon.Event.register({
    name: 'InView',
    handler: function(element, context, callback) {
      element.addEventListener('click', function(event) {
        callback.bind(generateBindObject(element))(context);
      })
    }
  });

  Beacon.configure = function(config) {
    internal.config = config;
  };

  window.Beacon = Beacon;
})(window.Beacon || {});
