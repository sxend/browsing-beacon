import Tracker from '../tracker';
import BBEvent from '../events/bb-event';
export default function watch(tracker: Tracker, event: BBEvent, callback?: (Error, Element) => void): void {
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
            (callback || defaultCallback).apply(bb, [err, event, element, index].concat(args));
          });
        }
      });
      watchedElements = watchedElements.filter((watched) => {
        return elements.indexOf(watched) >= 0;
      });
    }, 50);
  }

}

function defaultCallback(err, event, element, index) {
  'use strict';
  var bb = this;
  if (err) {
    bb('send', 'exception', {
      exDescription: err.message,
      exStack: err.stack
    });
    return;
  }
  bb('send', 'event', {
    eventAction: event.name
  });
}
