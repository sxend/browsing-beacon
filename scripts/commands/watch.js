export default function() {
  let bb = this;
  let args = [].slice.call(arguments);
  let event = args.shift();
  if (event && event.isBBEvent) {
    let callback = args.shift();
    let context = {};
    let watchedElements = [];
    setInterval(() => {
      let elements = event.getElements();
      if (elements.length == 0) {
        watchedElements = [];
        return;
      }
      elements.forEach((element) => {
        if (watchedElements.indexOf(element) < 0) {
          watchedElements.push(element);
          event.handle(context, element, function() {
            let args = [].slice.call(arguments);
            let err = args.shift();
            if (err) {;
              return callback(err);
            }
            callback.apply(context, args);
          });
        }
      });
      watchedElements = watchedElements.filter((watched) => {
        return elements.indexOf(watched) >= 0;
      });
    }, 50);
  }

}
