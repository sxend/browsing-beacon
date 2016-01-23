let Events = require('./events');
let configure = require('./commands/configure');
let name = window['BrowsingBeaconObject'];
let bb = window[name];
bb.log = console.log.bind(console);
bb.q.forEach(function(command){
  if (command[0] == 'configure') configure(bb, command.slice(1, command.length));
})
