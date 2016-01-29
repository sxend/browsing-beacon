import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(context, callback) {
    context.watchedElement = context.watchedElement || [];
    try {
      super.getElements().forEach((element) => {
        if (context.watchedElement.indexOf(element) >= 0) {
          return;
        }
        context.watchedElement.push(element);
        element.addEventListener('click', function(ev) {
          callback(null, ev);
        }, !!this.condition.useCapture);
      });
    } catch (e) {
      // FIXME remove watch element
      callback(e);
    }
  }
}
