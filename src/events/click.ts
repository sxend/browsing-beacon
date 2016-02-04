import BBEvent from './bbevent';
export default class Click extends BBEvent {
  constructor(condition) {
    super("click", condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('click', (event) => {
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
