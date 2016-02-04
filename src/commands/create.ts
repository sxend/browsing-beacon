declare var window: any;
import {BBObject} from '../index';
import Config from '../config/index';
import {isString} from '../utils/type-check';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(id: string, option: any): void {
  'use strict';
  var bb: BBObject = this;
  if (!isString(id)) {
    throw new Error("id is required.");
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
