import Tracker from '../tracker';
import {isString} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import {registerPlugin} from '../plugins';

// requireは予約語のため、関数名省略
export default function(tracker: Tracker, pluginName: string, pluginOption: any = {}) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!isString(pluginName)) {
    throw new Error("pluginName is not string.");
  }
  registerPlugin(bb, tracker, pluginName, pluginOption);
}
