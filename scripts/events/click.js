import BBEvent from './bbevent';

export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  watch(callback) {
    try {
      super.getElements().forEach(function(element) {
        element.addEventListener('click', function(ev) {
          callback(null, ev);
        });
      });
    } catch (e) {
      callback(e);
    }
  }
}
