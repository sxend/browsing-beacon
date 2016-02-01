import Commands from './commands/index.ts';
import Events from './events/index.ts';

import {
  isFunction,
  isString
} from './utils/type-check.ts';

export interface BBObject {
  (...args: any[]): void;
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
bb.l = __bb.l;
bb.ev = Events;

window[name] = bb;
__bb.q.forEach(function(queuedArguments) {
  bb.apply(null, queuedArguments);
});






// import commands from './commands';
// import events from './events';
// import {
//   isFunction,
//   isString
// }
// from './utils/type-check';
//
// let name = window['BrowsingBeaconObject'];
// let oldbb = window[name];
//
// let bb = function() {
//   let args = [].slice.call(arguments);
//   let command = args.shift();
//   if (!command) {
//     return;
//   }
//   if (isFunction(command)) {
//     command.apply(bb, args);
//     return;
//   }
//   if (isString(command)) {
//     let handler = commands[command];
//     if (isFunction(handler)) {
//       handler.apply(bb, args);
//     }
//   }
// };
//
// bb.l = oldbb.l;
// bb.__ENVIRONMENT__ = oldbb.__ENVIRONMENT__;
// bb.ev = events;
//
// bb.isProduction = function() {
//   return !bb.__ENVIRONMENT__ || bb.__ENVIRONMENT__ == 'prd';
// }
// bb.log = bb.isProduction() ? function() {} : console.log.bind(console);
// window[name] = bb;
//
// oldbb.q.forEach(function(queuedArguments) {
//   bb.apply(null, queuedArguments);
// });
