import Tracker from '../tracker';
import {isString, isFunction} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import {Strings} from '../utils/strings';

export default function provide(tracker: Tracker, pluginName: string, constructorOrUrl: any, callback) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!isString(pluginName)) {
    throw new Error('pluginName must be string');
  }
  bb.p = bb.p || {};
  if (isFunction(constructorOrUrl)) {
    bb.p[pluginName] = constructorOrUrl;
  } else if (isString(constructorOrUrl) && Strings.startsWith(constructorOrUrl, '//')) {
    loadPluginFromUrl(bb, pluginName, constructorOrUrl, callback);
  }
}
var callbacks: any = {};
function loadPluginFromUrl(bb: BrowsingBeacon, pluginName: string, pluginUrl, callback) {
  'use strict';
  window['__BBPluginCallback'] = window['__BBPluginCallback'] || (function() {
    function BBPluginCallback(name, generator) {
      generator(bb, function(err, PluginConstructor) {
        if (isFunction(PluginConstructor)) {
          bb.p[name] = PluginConstructor;
        }
        if (!isFunction(callback)) {
          return;
        }
        callbacks[name](err, PluginConstructor);
      });
    }
    return BBPluginCallback;
  })();
  callbacks[pluginName] = callback;
  insertScript(pluginUrl);
}
function insertScript(pluginUrl: string) {
  'use strict';
  var script = document.createElement('script');
  script.async = true;
  script.src = pluginUrl;
  var beforeTag = document.getElementsByTagName('script')[0];
  beforeTag.parentNode.insertBefore(script, beforeTag);
}
