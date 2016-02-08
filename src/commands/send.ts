declare var navigator: any;
import Tracker from '../tracker';

// bb('send', 'pageview');
// bb('send', 'event', {'name': 'click'}, {transport: 'strict'});
export default function send(tracker: Tracker, ...args: any[]): void {
  'use strict';
  tracker.send.apply(tracker, args);
};
