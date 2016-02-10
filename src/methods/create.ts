declare var window: any;
import Tracker from '../tracker';
import {BrowsingBeacon} from '../browsing-beacon';
import {isString, isObject} from '../utils/type-checker';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(tracker: Tracker, trackingId: string, cookieDomain: string, name: string, fieldsObject: any = {}): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (tracker) {
    console.warn('this tracker is already initialized. trackerName: ', tracker.get("name"));
  }
  if (!isString(trackingId)) {
    throw new Error("trackingId is required.");
  }

  if (isObject(cookieDomain)) {
    fieldsObject = cookieDomain;
  } else if (isObject(name)) {
    fieldsObject = name;
  }

  fieldsObject.trackingId = trackingId = isString(trackingId) ? trackingId : "";
  fieldsObject.cookieDomain = cookieDomain = isString(cookieDomain) ? cookieDomain : document.location.hostname;
  fieldsObject.name = name = isString(name) ? name : Tracker.DEFAULT_NAME;
  bb.t[name] = new Tracker(bb, fieldsObject);
}
