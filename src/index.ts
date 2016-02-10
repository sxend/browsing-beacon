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
  command.apply(bb, args);
};

bb.l = l;
bb.ev = Events;
bb.h = {};
bb.plg = {};
window[name] = bb;
q.forEach((queuedArguments) => {
  bb.apply(null, queuedArguments);
});

function resolveMethod(bb: BrowsingBeacon, commandString: string) {
  'use strict';
  var trackerName = "";
  var pluginName = "";

  var dotIndex = commandString.indexOf('.');
  if (dotIndex >= 0) {
    trackerName = commandString.substring(0, dotIndex);
    commandString = commandString.substring(dotIndex + 1, commandString.length);
  }

  var colonIndex = commandString.indexOf(':');
  if (colonIndex >= 0) {
    pluginName = commandString.substring(0, colonIndex);
    commandString = commandString.substring(colonIndex + 1, commandString.length);
  }

  var methodName = commandString;
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
function command(...args: any[]): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  var commandOrFunction: any = args.shift();
  if (!commandOrFunction) {
    return;
  }
  if (isString(commandOrFunction)) {
    var method = resolveMethod(bb, commandOrFunction);
    if (isFunction(method)) {
      return method.apply(bb, args);
    }
  } else if (isFunction(commandOrFunction)) {
    return commandOrFunction.apply(bb, args);
  }
}
