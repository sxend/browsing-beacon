import {BrowsingBeacon} from '../browsing-beacon';
import {isUndefined} from '../utils/type-checker';
import Tracker from '../tracker';

export default function remove(tracker: Tracker) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (isUndefined(tracker)) {
    console.warn('tracker is not exists.');
    return;
  }
  if (!isUndefined(bb.h)) {
    delete bb.h[tracker.get('name')];
  }
}
