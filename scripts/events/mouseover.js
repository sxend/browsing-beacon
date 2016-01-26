import BBEvent from './bbevent';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  watcher(element, callback) {
    element.addEventListener('mouseover', function(ev) {
      callback(null, ev);
    });
  }
}
