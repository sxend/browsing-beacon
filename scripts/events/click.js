import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(callback) {
    try {
      super.getElements().forEach((element) => {
        element.addEventListener('click', function(ev) {
          callback(null, ev);
        }, !!this.condition.useCapture);
      });
    } catch (e) {
      callback(e);
    }
  }
}
