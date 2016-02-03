import BBEvent from './bbevent';
import Cookies from '../utils/cookies';
export default class Click extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('click', (event) => {
        Cookies.setItem('pa-click-place', "1");
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
