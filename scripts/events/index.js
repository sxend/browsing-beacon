import Event from './event';
import Emitter from '../emitter';
import InView from './inview';

class Events {
  constructor (config) {
    this.emitter = new Emitter(config);

    loadDefaultEvent(this, config);
  }

  register(eventDefinition) {
    Events[eventDefinition.name] = createEventClass(eventDefinition);
    return Events[eventDefinition.name];
  }
  watch(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);


    [].slice.call(elements).forEach(function(element) {
      var context = {};
      target.handler.call(context, element, function(event) {
        callback.call(context, element, event, messageCallback);
      });
    });
  }
}

function loadDefaultEvent(events) {
  this.InView = InView;
}
function createEventClass(eventDefinition) {
  return function(config) {
    return new Event(eventDefinition, config);
  }
}

function messageCallback(emitter, message) {
  emitter.emit(message);
}
