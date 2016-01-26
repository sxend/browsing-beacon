import BBEvent from './bbevent';

export default class Mouseover extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  watch(callback) {
    try {
      super.getElements().forEach(function(element) {
        element.addEventListener('mouseover', function(ev) {
          callback(null, ev);
        });
      });
    } catch (e) {
      callback(e);
    }
  }
}
