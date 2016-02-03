declare var window: any;
import {BBObject} from '../index';
import Config from '../config/index';
import {isString, toObject} from '../utils/type-check';

export default function create(id: string, endpoint: any, option: any): void {
  'use strict';
  var bb: BBObject = this;
  if (!isString(id)) {
    throw new Error("id is required.");
  }
  bb.id = id;
  option = toObject(endpoint) || toObject(option) || {};
  if (isString(endpoint)) {
    option.endpoint = endpoint;
  }
  Config.setConfig(option);
  var config: any = Config.getConfig();
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
