import {BrowsingBeacon} from '../browsing-beacon';
import {TypeChecker} from '../utils/type-checker';
import Tracker from '../tracker';

export default function remove(tracker: Tracker) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (TypeChecker.isUndefined(tracker)) {
    console.warn('tracker is not exists.');
    return;
  }
  if (!TypeChecker.isUndefined(bb.h)) {
    delete bb.h[tracker.get('name')];
  }
}
