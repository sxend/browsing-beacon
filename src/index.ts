import Commands from './commands/index';
import Events from './events/index';
import {BrowsingBeacon} from './browsing-beacon';
import {TypeChecker} from './utils/type-checker';


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
    var handler = Commands[command];
    if (TypeChecker.isFunction(handler)) {
      handler.apply(bb, args);
    }
  }
};

bb.l = l;
bb.ev = Events;
window[name] = bb;
q.forEach((queuedArguments) => {
  bb.apply(null, queuedArguments);
});
