let name = window['BrowsingBeaconObject'];
let bb = window[name];
bb.log = !!bb.__debug__ ? console.log.bind(console) : function() {};

let Events = require('./events');

import configure from './commands/configure';

setInterval(function() {
  let length = bb.q.length;
  for (let i = 0; i < length; i++) {
    let command = bb.q.shift();
    if (command[0] == 'configure') {
      configure(bb, [].slice.call(command).slice(1, command.length));
    }
  }
}, 50);
