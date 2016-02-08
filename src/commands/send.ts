import Tracker from '../tracker';

// bb('send', 'pageview');
// bb('send', 'event', {'name': 'click'}, {transport: 'strict'});
export default function send(tracker: Tracker, ...fields: any[]): void {
  'use strict';
  tracker.send.apply(null, fields);
};
