import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('click', function(ev) {
        callback(null, ev);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
