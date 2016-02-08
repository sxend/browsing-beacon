declare var window: any;
import {BrowsingBeacon} from '../browsing-beacon';
import Config from '../config/index';
import {TypeChecker} from '../utils/type-checker';

// bb('create', 'id-00000-01', { optionkey: 'optionvalue'});
export default function create(id: string, option: any): void {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!TypeChecker.isString(id)) {
    throw new Error("id is required.");
  }
  initialize(bb, id, option || {});
}

function initialize(bb: BrowsingBeacon, id: string, option: any) {
  'use strict';

  Config.setConfig(option);
  var config = Config.getConfig();
  // load plugin
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
