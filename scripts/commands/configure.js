import Config from '../config';
export default function(args) {
  let bb = this;
  let defaultConfig = Config.getConfig(bb);
  if (!args) {
    bb.log("empty arguments is invalid");
    return;
  }
  let config = {};

  if ('string' === typeof args[0]) {
    config.id = args[0]
    config.plugins = args.slice(1, args.length);
    config.endpoint = defaultConfig.endpoint // default
  } else {
    config = args[0];
  }
  bb.c = config;
  config.plugins.forEach(function(url, index) {
    let script = document.createElement('script');
    script.async = 1;
    script.src = url;
    let beforeTag = document.getElementsByTagName('script')[0];
    beforeTag.parentNode.insertBefore(script, beforeTag);
    window.__BBPluginCallback = (window.__BBPluginCallback || function(handler) {
      handler(bb, config);
    });
  });
}
