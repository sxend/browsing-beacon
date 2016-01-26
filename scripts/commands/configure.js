import Config from '../config';
export default function(arg) {
  let bb = this;
  let defaultConfig = Config.getConfig(bb);
  if (!arg) {
    bb.log("empty arguments is invalid");
    return;
  }
  let config = {};

  if ('string' === typeof arg) {
    config.id = arg;
    config.plugins = [];
    config.endpoint = defaultConfig.endpoint // default
  } else {
    config = arg;
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
