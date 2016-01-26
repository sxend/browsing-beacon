import commands from './commands';
import events from './events';

let name = window['BrowsingBeaconObject'];
let oldbb = window[name];

let bb = function() {
  let args = [].slice.call(arguments);
  let command = args.shift();
  if(!command) {
    return;
  }
  if(command instanceof Function) {
    command.apply(bb, args);
    return;
  }
  let handler = commands[command];
  if(handler){
    handler.apply(bb, args);
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

oldbb.q.forEach(function(queuedArguments){
  bb.apply(null, queuedArguments);
});
