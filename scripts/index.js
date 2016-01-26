let name = window['BrowsingBeaconObject'];
let bb = window[name];

import commands from './commands';
import events from './events';
function initialize(bb) {
  bb.isProduction = function() {
    return !bb.__ENVIRONMENT__ || bb.__ENVIRONMENT__ == 'prd';
  }
  bb.log = bb.isProduction() ? function() {} : console.log.bind(console);
  bb.cm = commands(bb);
  // bb.ev = events(bb); // FIXME

  setInterval(function() {
    let length = bb.q.length;
    for (let i = 0; i < length; i++) {
      let command = bb.q.shift();
      if (!command || command.length <= 0) {
        return;
      }
      let handler = bb.cm[command[0]];
      if (handler) {
        handler([].slice.call(command).slice(1, command.length));
      }
    }
  }, 10);
}
initialize(bb);
