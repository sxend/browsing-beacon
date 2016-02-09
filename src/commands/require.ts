import Tracker from '../tracker';
import {isString, isFunction} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';

// requireは予約語のため、関数名省略
export default function(tracker: Tracker, pluginName: string, pluginOption: any = {}) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!isString(pluginName)) {
    throw new Error("pluginName is not string.");
  }
  registerPlugin(bb, tracker, pluginName, pluginOption);
}

function registerPlugin(bb: BrowsingBeacon, tracker: Tracker, pluginName: string, pluginOption: any) {
  'use strict';
  var PluginConstructor = bb.plg[pluginName];
  if (isFunction(PluginConstructor)) {
    var plugin = new PluginConstructor(tracker, pluginOption);
    tracker.set(pluginName, plugin);
  }
}
