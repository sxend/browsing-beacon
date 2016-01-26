let name = window['BrowsingBeaconObject'];
let bb = window[name];

function initialize() {
  bb.isProduction = function() {
    return !bb.__ENVIRONMENT__ || bb.__ENVIRONMENT__ == 'prd';
  }
  bb.log = bb.isProduction() ? function() {} : console.log.bind(console);

  import commands from './commands';
  import events from './events';
  bb.cm = commands;
  bb.ev = events;

  setInterval(function() {
    let length = bb.q.length;
    for (let i = 0; i < length; i++) {
      let command = bb.q.shift();
      if (!command || command.length <= 0) {
        return;
      }
      let handler = bb.cm[command[0]];
      if (handler) {
        handler(bb, [].slice.call(command).slice(1, command.length));
      }
    }
  }, 10);
}
initialize();
export default bb;
