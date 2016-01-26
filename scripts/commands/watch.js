export default function() {
  let bb = this;
  let args = [].slice.call(arguments);
  let event = args.shift();

  if (event && event.isBBEvent) {
    let callback = args.shift();
    let elements = document.querySelectorAll(event.condition.querySelector);
    [].slice.call(elements).forEach(function(element) {
      event.watcher(element, callback);
    });
  }

}
