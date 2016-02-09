import BBEvent from './bb-event';

export default class Click extends BBEvent {
  constructor(condition) {
    super("click", condition);
  }
  register(element, callback) {
    try {
      element.addEventListener('click', (event) => {
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
