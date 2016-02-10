declare var window: any;
import Tracker from '../tracker';
import {BrowsingBeacon} from '../browsing-beacon';
import {isString, isObject} from '../utils/type-checker';
import builtinPlugins from '../builtin-plugins';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(_: Tracker, trackingId: string, cookieDomainOrField: any, nameOrField: any, field: any = {}): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!isString(trackingId)) {
    throw new Error("trackingId is required.");
  }

  if (isObject(cookieDomainOrField)) {
    field = cookieDomainOrField;
  } else if (isObject(nameOrField)) {
    field = nameOrField;
  }

  field.trackingId = trackingId;
  field.cookieDomain = isString(cookieDomainOrField) ? cookieDomainOrField : document.location.hostname;
  field.name = isString(nameOrField) ? nameOrField : Tracker.DEFAULT_NAME;
  var tracker = new Tracker(bb, field);
  var trackerName = tracker.get("name");
  bb.t[trackerName] = tracker;
  initializeBuiltinPlugins(bb, trackerName);
}

function initializeBuiltinPlugins(bb, trackerName) {
  'use strict';
  Object.keys(builtinPlugins).forEach((name) => {
    bb('provide', name, builtinPlugins[name]);
    bb(trackerName + '.require', name);
  });
}
