
import Tracker from '../tracker';

export default function set(tracker: Tracker, keyOrField: any, value: any) {
  'use strict';
  tracker.set(keyOrField, value);
}
