declare var window: any;
import Tracker from '../tracker';
import {BrowsingBeacon} from '../browsing-beacon';
import {TypeChecker} from '../utils/type-checker';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(tracker: Tracker, trackingId: string, cookieDomain: string, name: string, fieldsObject: any = {}): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (tracker) {
    console.warn('this tracker is already initialized. trackerName: ', tracker.get("name"));
  }
  if (!TypeChecker.isString(trackingId)) {
    throw new Error("trackingId is required.");
  }

  if (TypeChecker.isObject(cookieDomain)) {
    fieldsObject = cookieDomain;
  } else if (TypeChecker.isObject(name)) {
    fieldsObject = name;
  }

  fieldsObject.trackingId = trackingId = TypeChecker.isString(trackingId) ? trackingId : "";
  fieldsObject.cookieDomain = cookieDomain = TypeChecker.isString(cookieDomain) ? cookieDomain : document.location.hostname;
  fieldsObject.name = name = TypeChecker.isString(name) ? name : "";
  bb.h[name] = new Tracker(bb, fieldsObject);
}
