import {BrowsingBeacon} from '../browsing-beacon';
import {isUndefined} from '../utils/type-checker';
import Tracker from '../tracker';

export default function remove(tracker: Tracker) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (isUndefined(tracker)) {
    return;
  }
  if (!isUndefined(bb.t)) {
    delete bb.t[tracker.get('name')];
  }
}
