
import Tracker from '../tracker';

export default function set(tracker: Tracker, key: string, value: any) {
  'use strict';
  tracker.set(key, value);
}
