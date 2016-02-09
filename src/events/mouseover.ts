import BBEvent from './bb-event';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super("mouseover", condition);
  }
  register(element, callback) {
    try {
      element.addEventListener('mouseover', function(ev) {
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
