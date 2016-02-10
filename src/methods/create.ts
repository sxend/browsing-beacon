declare var window: any;
import Tracker from '../tracker';
import {BrowsingBeacon} from '../browsing-beacon';
import {isString, isObject} from '../utils/type-checker';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(tracker: Tracker, trackingId: string, cookieDomainOrField: any, nameOrField: any, field: any = {}): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (tracker) {
    console.warn('this tracker is already initialized. trackerName: ', tracker.get("nameOrField"));
  }
  if (!isString(trackingId)) {
    throw new Error("trackingId is required.");
  }

  if (isObject(cookieDomainOrField)) {
    field = cookieDomainOrField;
  } else if (isObject(nameOrField)) {
    field = nameOrField;
  }

  field.trackingId = trackingId = isString(trackingId) ? trackingId : "";
  field.cookieDomainOrField = cookieDomainOrField = isString(cookieDomainOrField) ? cookieDomainOrField : document.location.hostname;
  field.nameOrField = nameOrField = isString(nameOrField) ? nameOrField : Tracker.DEFAULT_NAME;
  bb.t[name] = new Tracker(bb, field);
}
