import Commands from './commands/index';
import Events from './events/index';
import {BrowsingBeacon} from './browsing-beacon';
import {isString, isFunction} from './utils/type-checker';
import Tracker from './tracker';


var name: string = window['BrowsingBeaconObject'] = window['BrowsingBeaconObject'] || "bb";
var __bb: any = window[name] || {};
var l: number = Number(__bb.l || Date.now());
var q: any[] = [].concat.call(__bb.q || []);
var bb = <BrowsingBeacon> function(...args: any[]): void {
  var command: any = args.shift();
  if (!command) {
    return;
  }
  if (isFunction(command)) {
    return command.apply(bb, args);
  }

  if (isString(command)) {
    var method = resolveMethod(bb, command);
    return method.apply(null, args);
  }
};

bb.l = l;
bb.ev = Events;
bb.h = {};
bb.plg = {};
window[name] = bb;
q.forEach((queuedArguments) => {
  bb.apply(null, queuedArguments);
});

function resolveMethod(bb: BrowsingBeacon, command: string) {
  'use strict';
  var trackerName = "";
  var pluginName = "";

  var dotIndex = command.indexOf('.');
  if (dotIndex >= 0) {
    trackerName = command.substring(0, dotIndex);
    command = command.substring(dotIndex + 1, command.length);
  }

  var colonIndex = command.indexOf(':');
  if (colonIndex >= 0) {
    pluginName = command.substring(0, colonIndex);
    command = command.substring(colonIndex + 1, command.length);
  }

  var methodName = command;
  var tracker: Tracker = bb.h[trackerName];
  var plugin = tracker && tracker.get(pluginName);
  var pluginMethod = plugin && plugin[methodName];
  var builtinMethod = Commands[methodName];
  return function(...args: any[]) {
    if (!isFunction(pluginMethod) && !isFunction(builtinMethod)) {
      return;
    }
    if (isFunction(pluginMethod)) {
      return pluginMethod.apply(bb, args);
    }
    if (isFunction(builtinMethod)) {
      return builtinMethod.apply(bb, [tracker].concat(args)); // TODO pluginと合わせる
    }
  };
}
