
import Event from './event';
import {isFunction} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import Tracker from '../tracker';

export default {
  'event': Event
}

export function registerPlugin(bb: BrowsingBeacon, tracker: Tracker, pluginName: string, pluginOption: any) {
  'use strict';
  var PluginConstructor = bb.p[pluginName];
  if (isFunction(PluginConstructor)) {
    var plugin = new PluginConstructor(tracker, pluginOption);
    tracker.set(pluginName, plugin);
  }
}
