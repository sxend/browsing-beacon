import commands from './commands';
import events from './events';
import {
  isFunction,
  isString
}
from './utils/type-check';

let name = window['BrowsingBeaconObject'];
let oldbb = window[name];

let bb = function() {
  let args = [].slice.call(arguments);
  let command = args.shift();
  if (!command) {
    return;
  }
  if (isFunction(command)) {
    command.apply(bb, args);
    return;
  }
  if (isString(command)) {
    let handler = commands[command];
    if (isFunction(handler)) {
      handler.apply(bb, args);
    }
  }
};

bb.l = oldbb.l;
bb.__ENVIRONMENT__ = oldbb.__ENVIRONMENT__;
bb.ev = events;

bb.isProduction = function() {
  return !bb.__ENVIRONMENT__ || bb.__ENVIRONMENT__ == 'prd';
}
bb.log = bb.isProduction() ? function() {} : console.log.bind(console);
window[name] = bb;

oldbb.q.forEach(function(queuedArguments) {
  bb.apply(null, queuedArguments);
});
