let name = window['BrowsingBeaconObject'];
let bb = window[name];
bb.log = console.log.bind(console);

let Events = require('./events');

import configure from './commands/configure';

bb.log(configure);
setInterval(function() {
  let length = bb.q.length;
  for (let i = 0; i < length; i++) {
    let command = bb.q.shift();
    if (command[0] == 'configure') {
      configure(bb, [].slice.call(command).slice(1, command.length));
    }
  }
}, 50);
