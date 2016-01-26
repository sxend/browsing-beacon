import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  watcher(element, callback) {
    element.addEventListener('click', function(ev) {
      callback(null, ev);
    });
  }
}
