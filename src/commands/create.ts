declare var window: any;
import Tracker from '../tracker';
import {BrowsingBeacon} from '../browsing-beacon';
import {TypeChecker} from '../utils/type-checker';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(tracker: Tracker, trackingId: string = "", cookieDomain: string = document.location.hostname, name: string = "", fieldObject: any = {}): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (tracker) {
    console.warn('this tracker is already initialized. trackerName: ', tracker.get("name"));
  }
  if (!TypeChecker.isString(trackingId)) {
    throw new Error("trackingId is required.");
  }

  if (TypeChecker.isObject(cookieDomain)) {
    fieldObject = cookieDomain;
    fieldObject.cookieDomain = document.location.hostname;
  } else if (TypeChecker.isObject(name)) {
    fieldObject = name;
    fieldObject.name = "";
  }
  bb.h[name] = new Tracker(bb, fieldObject);
}
