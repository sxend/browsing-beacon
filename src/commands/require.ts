import Tracker from '../tracker';
import {TypeChecker} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import provide from './provide';

// requireは予約語のため、関数名省略
export default function(tracker: Tracker, pluginName: string, pluginUrl: string, pluginOption: any = {}) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!TypeChecker.isString(pluginName)) {
    throw new Error("pluginName is not string.");
  }
  if (TypeChecker.isObject(pluginUrl)) {
    pluginOption = pluginUrl;
  }
  if (TypeChecker.isString(pluginUrl)) {
    // urlでロード
    registerPluginFromUrl(bb, tracker, pluginName, pluginUrl, pluginOption);
  } else {
    registerPlugin(bb, tracker, pluginName, pluginOption);
  }
}

function registerPlugin(bb: BrowsingBeacon, tracker: Tracker, pluginName: string, pluginOption: any) {
  'use strict';
  var PluginConstructor = bb.plg[pluginName];
  if (TypeChecker.isFunction(PluginConstructor)) {
    var plugin = new PluginConstructor(pluginOption);
    tracker.set(pluginName, plugin);
  }
}

function registerPluginFromUrl(bb: BrowsingBeacon, tracker: Tracker, pluginName: string, pluginUrl: string, pluginOption: any) {
  'use strict';
  var script = document.createElement('script');
  script.async = true;
  script.src = pluginUrl;
  var beforeTag = document.getElementsByTagName('script')[0];
  beforeTag.parentNode.insertBefore(script, beforeTag);
  var pluginCallbackName = '__BBPluginCallback_' + tracker.get("name");
  window[pluginCallbackName] = (window[pluginCallbackName] || function(handler) {
    handler(bb, tracker, function(err, PluginConstructor) {
      if (err) {
        throw err;
      }
      provide.call(bb, tracker, pluginName, PluginConstructor);
      registerPlugin(bb, tracker, pluginName, pluginOption);
    });
  });
}
