import BBEvent from './bbevent';
import Marker from '../utils/marker';

export default class Click extends BBEvent {
  constructor(condition) {
    super("click", condition);
  }
  handle(element, callback) {
    try {
      element.addEventListener('click', (event) => {
        Marker.mark('beforeClickLocation', location.href);
        console.log("mark!!!!");
        callback(null);
      }, !!this.condition.useCapture);
    } catch (e) {
      callback(e);
    }
  }
}
