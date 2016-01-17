module.exports = function(internal) {
  function Events() {}
  internal.Events = Events;
  var Emitter = require('../emitter.js')(internal);
  var emitter = new Emitter();

  function createEventType(handler) {
    function F(eventConfig) {
      if (!(this instanceof F)) return new F(eventConfig);
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return F;
  }

  function messageCallback(message) {
    emitter.emit(message);
  }

  Events.register = function(definetion) {
    Events[definetion.name] = createEventType(definetion.handler);
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
