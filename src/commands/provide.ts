import Tracker from '../tracker';
import {TypeChecker} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
export default function provide(tracker: Tracker, pluginName: string, PluginConstructor: any) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!TypeChecker.isString(pluginName)) {
    throw new Error('pluginName must be string');
  }
  if (!TypeChecker.isFunction(PluginConstructor)) {
    throw new Error('PluginConstructor must be function');
  }
  bb.plg = bb.plg || {};
  bb.plg[pluginName] = PluginConstructor;
}
