import BBEvent from './bbevent';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(callback) {
    let that = this;
    try {
      super.getElements().forEach(function(element) {
        element.addEventListener('mouseover', function(ev) {
          callback(null, ev);
        }, !!that.condition.useCapture);
      });
    } catch (e) {
      callback(e);
    }
  }
}
