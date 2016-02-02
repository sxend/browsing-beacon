import Commands from './commands/index.ts';
import Events from './events/index.ts';

import {
isFunction,
isString
} from './utils/type-check.ts';

export interface BBObject {
  (...args: any[]): void;
  id: string;
  q: any[];
  l: number;
  ev: any;
}
var name: string = window['BrowsingBeaconObject'];
var __bb: BBObject = window[name];
var bb: BBObject = <BBObject> function(...args: any[]): void {
  var command: any = args.shift();
  if (!command) {
    return;
  }
  if (isFunction(command)) {
    command.apply(bb, args);
    return;
  }
  if (isString(command)) {
    var handler = Commands[command];
    if (isFunction(handler)) {
      handler.apply(bb, args);
    }
  }
};
window[name] = bb;
bb.ev = Events;
bb.l = __bb ? __bb.l : Date.now();
__bb ? __bb.q.forEach(function(queuedArguments) {
  bb.apply(null, queuedArguments);
}) : 0;
