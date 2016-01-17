module.exports = function(internal) {
  function Events() {}
  internal.Events = Events;
  var Emitter = require('../emitter.js')(internal);
  var emitter = new Emitter();

  function createEventClass(handler) {
    function Event(eventConfig) {
      if (!(this instanceof Event)) return new Event(eventConfig);
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return Event;
  }

  function messageCallback(message) {
    emitter.emit(message);
  }

  Events.register = function(definetion) {
    Events[definetion.name] = createEventClass(definetion.handler);
    return Events[definetion.name];
  };
  Events.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler.bind(context)(element, function(event) {
        callback.bind(context)(element, event, messageCallback);
      });
    });
  };
  // load standard event
  require('./inview.js')(internal);

  return Events;
}
