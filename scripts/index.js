let Events = require('./events');
let configure = require('./commands/configure');
console.log(configure);
let name = window['BrowsingBeaconObject'];
let bb = window[name];
bb.log = console.log.bind(console);
bb.q.forEach(function(command){
  if (command[0] == 'configure') configure(bb, [].slice.call(command).slice(1, command.length));
})
