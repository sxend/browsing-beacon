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
      this.handler = hander;
    };
    return F;
  }
  function generateBindObject(element) {
    return {
      element: element,
      emit: function(value){
        console.log(value);
      }
    };
  }
  Beacon.Event.register = function(newEvent) {
    Beacon.Events[newEvent.name] = generateEvent(newEvent.handler);
  }
  Beacon.Event.watch = function(target, calback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler.bind(generateBindObject(element))(context, callback);
    });
  }

  Beacon.configure = function(config) {
    internal.config = config;
  };

  window.Beacon = Beacon;
})(window.Beacon || {});
