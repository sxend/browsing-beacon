declare var window: any;

import Config from '../config/index.ts';
import {
isString
}
from '../utils/type-check.ts';

export default function create(trackingId: string, ...options: any[]): void {
  'use strict';
  var bb = this;
  if (!isString(trackingId)) {
    bb.log("arguments is invalid");
    return;
  }
  var option = {
    id: trackingId
  };
  // FIXME
  Config.setConfig(option);
  var config: any = bb.c = Config.getConfig();
  config.plugins.forEach(function(url, index) {
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    var beforeTag = document.getElementsByTagName('script')[0];
    beforeTag.parentNode.insertBefore(script, beforeTag);
    window.__BBPluginCallback = (window.__BBPluginCallback || function(handler) {
      handler(bb, config);
    });
  });
}
