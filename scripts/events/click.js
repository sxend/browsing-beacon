import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(context, element, callback) {
    try {
      element.addEventListener('click', (event) => {
        (context.events = context.events || []).push(event);
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
