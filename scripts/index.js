let name = window['BrowsingBeaconObject'];
let bb = window[name];
bb.log = !!bb.__debug__ ? console.log.bind(console) : function() {};

let Events = require('./events');

import commands from './commands';
bb.cm = commands;
setInterval(function() {
  let length = bb.q.length;
  for (let i = 0; i < length; i++) {
    let command = bb.q.shift();
    let handler = bb.cm[command[0]];
    if (handler) {
      handler(bb, [].slice.call(command).slice(1, command.length));
    }
  }
}, 10);
