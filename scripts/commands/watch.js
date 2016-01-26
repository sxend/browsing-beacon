export default function(bbevent, callback) {
  let bb = this;
  let elements = document.querySelectorAll(bbevent.condition.querySelector);
  [].slice.call(elements).forEach(function(element) {
    bbevent.watcher(element, callback);
  });
}
