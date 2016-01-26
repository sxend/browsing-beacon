import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(callback) {
    let that = this;
    try {
      super.getElements().forEach(function(element) {
        element.addEventListener('click', function(ev) {
          callback(null, ev);
        }, !!that.condition.useCapture);
      });
    } catch (e) {
      callback(e);
    }
  }
}
