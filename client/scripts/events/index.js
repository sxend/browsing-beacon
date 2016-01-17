module.exports = function(internal) {
  function Events() {}
  internal.Events = Events;
  var Emitter = require('../emitter.js')(internal);
  var emitter = new Emitter();

  function createEventClass(eventDefinition) {
    function Event(config) {
      if (!(this instanceof Event)) {
        return new Event(config);
      }
      this.querySelector = config.querySelector;
      this.handler = eventDefinition.handler;
    };
    return Event;
  }

  function messageCallback(message) {
    emitter.emit(message);
  }

  Events.register = function(eventDefinition) {
    Events[eventDefinition.name] = createEventClass(eventDefinition);
    return Events[eventDefinition.name];
  };
  Events.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler.call(context, element, function(event) {
        callback.call(context, element, event, messageCallback);
      });
    });
  };
  // load standard event
  require('./inview.js')(internal);

  return Events;
}
