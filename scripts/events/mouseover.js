import BBEvent from './bbevent';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('mouseover', function(ev) {
        callback(null, ev);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
