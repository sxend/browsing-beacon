import Commands from './commands/index';
import Events from './events/index';
import {BrowsingBeacon} from './browsing-beacon';
import {TypeChecker} from './utils/type-checker';
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
  if (TypeChecker.isFunction(command)) {
    command.apply(bb, args);
    return;
  }

  if (TypeChecker.isString(command)) {
    var trackerName = "";
    var pluginName = "";
    var dotIndex = command.indexOf('.');
    var colonIndex = command.indexOf(':');
    if (dotIndex >= 0) {
      trackerName = command.substring(0, dotIndex);
      command = command.substring(dotIndex + 1, command.length);
    }
    if (colonIndex >= 0) {
      pluginName = command.substring(0, colonIndex);
      command = command.substring(colonIndex + 1, command.length);
    }
    var tracker: Tracker = bb.h[trackerName];
    var plugin = tracker ? tracker.get(pluginName) : undefined;
    args = (!!tracker ? [tracker] : []).concat(args);

    if (plugin) {
      plugin[command].apply(bb, args);
    } else {
      Commands[command].apply(bb, args);
    }
  }
};

bb.l = l;
bb.ev = Events;
bb.h = {};
window[name] = bb;
q.forEach((queuedArguments) => {
  bb.apply(null, queuedArguments);
});
