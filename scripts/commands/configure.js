import Config from '../config';
import {
  isString
}
from '../utils/type-check';

export default function(arg) {
  let bb = this;
  if (!arg) {
    bb.log("empty arguments is invalid");
    return;
  }
  let option = {};
  if (isString(arg)) {
    option.id = arg;
  } else {
    option = arg;
  }
  let config = Config.getConfig(bb, option);
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
