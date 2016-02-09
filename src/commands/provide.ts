import Tracker from '../tracker';
import {isString, isFunction} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import {Strings} from '../utils/strings';

export default function provide(tracker: Tracker, pluginName: string, constructorOrUrl: any, callback?: (Error, PluginConstructor) => void) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!isString(pluginName)) {
    throw new Error('pluginName must be string');
  }
  bb.plg = bb.plg || {};
  if (isFunction(constructorOrUrl)) {
    bb.plg[pluginName] = constructorOrUrl;
  } else if (Strings.startsWith(constructorOrUrl, '//')) {
    loadPluginFromUrl(bb, pluginName, constructorOrUrl, callback);
  }
}
var queue = [];
function loadPluginFromUrl(bb: BrowsingBeacon, pluginName: string, pluginUrl: string, callback) {
  'use strict';
  function next() {
    var script = document.createElement('script');
    script.async = true;
    script.src = pluginUrl;
    var beforeTag = document.getElementsByTagName('script')[0];
    beforeTag.parentNode.insertBefore(script, beforeTag);
    window['__BBPluginCallback'] = function(generator) {
      try {
        generator(bb, function(err, PluginConstructor) {
          if (err) {
            if (callback) {
              callback(err);
            }
            return;
          }
          bb.plg[pluginName] = PluginConstructor;
          if (callback) {
            callback(null, PluginConstructor);
          }
        });
      } catch (e) {
        console.warn(e);
      }
      if (queue.length > 0) {
        queue.shift()();
      } else { // queue 消化完了
        window['__BBPluginCallback'] = void 0;
      }
    };
  }
  if (!isFunction(window['__BBPluginCallback'])) {
    next();
  } else {
    queue.push(next);
  }
}
