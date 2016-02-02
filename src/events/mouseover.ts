import BBEvent from './bbevent.ts';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('mouseover', function(ev) {
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
