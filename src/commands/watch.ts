export default function watch(...args: any[]): void {
  'use strict';
  var event = args.shift();
  if (event && event.isBBEvent) {
    var callback = args.shift();
    var context = {};
    var watchedElements = [];
    setInterval(() => {
      var elements = event.getElements();
      if (elements.length === 0) {
        watchedElements = [];
        return;
      }
      elements.forEach((element) => {
        if (watchedElements.indexOf(element) < 0) {
          watchedElements.push(element);
          event.handle(context, element, function() {
            var args = [].slice.call(arguments);
            var err = args.shift();
            callback.apply(context, [err, element].concat(args));
          });
        }
      });
      watchedElements = watchedElements.filter((watched) => {
        return elements.indexOf(watched) >= 0;
      });
    }, 50);
  }

}
