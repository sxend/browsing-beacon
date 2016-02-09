import Tracker from '../tracker';
import {isUndefined} from '../utils/type-checker';
import Events from '../events';
import BBEvent from '../events/bb-event';

export default class Event {
  private tracker: Tracker;
  constructor(tracker: Tracker) {
    this.tracker = tracker;
  }
  watch(option: any) {
    if (isUndefined(option)) {
      return;
    }
    var type = option.type || "";
    var Event = Events[type];
    if (isUndefined(Event)) {
      return;
    }
    var event = new Event(option.condition);
    watchEvent(this.tracker, event, option.callback);
  }
}
function watchEvent(tracker: Tracker, event: BBEvent, callback?: (Error, Element) => void): void {
  'use strict';
  var bb = this;
  if (event && event.isBBEvent) {
    var watchedElements = [];
    setInterval(() => {
      var elements = event.getElements();
      if (elements.length === 0) {
        watchedElements = [];
        return;
      }
      elements.forEach((element, index) => {
        if (watchedElements.indexOf(element) < 0) {
          watchedElements.push(element);
          event.register(element, function() {
            var args = [].slice.call(arguments);
            var err = args.shift();
            callback.apply(bb, [err, event, element, index].concat(args));
          });
        }
      });
      watchedElements = watchedElements.filter((watched) => {
        return elements.indexOf(watched) >= 0;
      });
    }, 50);
  }

}
