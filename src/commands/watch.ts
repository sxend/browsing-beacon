import BBEvent from '../events/bbevent';
export default function watch(event: BBEvent, callback?: (Error, Element) => void): void {
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
          event.handle(element, function() {
            var args = [].slice.call(arguments);
            var err = args.shift();
            (callback || defaultCallback).apply(bb, [err, element, index].concat(args));
          });
        }
      });
      watchedElements = watchedElements.filter((watched) => {
        return elements.indexOf(watched) >= 0;
      });
    }, 50);
  }

}

function defaultCallback(err, element) {
  'use strict';
  var bb = this;
  bb('send', 'default callback');
}
