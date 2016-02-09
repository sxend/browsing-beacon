import Tracker from '../tracker';
import BBEvent from '../events/bb-event';

export default class Watch {
  private tracker: Tracker;
  private option: any;
  constructor(tracker: Tracker, option: any = {}) {
    this.tracker = tracker;
    this.option = option;
  }
  watch(event: BBEvent, callback: () => void) {

  }
}
