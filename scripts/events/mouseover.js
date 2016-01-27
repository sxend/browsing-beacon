import BBEvent from './bbevent';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(callback) {
    try {
      super.getElements().forEach((element) => {
        element.addEventListener('mouseover', function(ev) {
          callback(null, ev);
        }, !!this.condition.useCapture);
      });
    } catch (e) {
      callback(e);
    }
  }
}
