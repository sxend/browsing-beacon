import Tracker from '../tracker';
import {TypeChecker} from '../utils/type-checker';
import {BrowsingBeacon} from '../browsing-beacon';
import {Strings} from '../utils/strings';

export default function provide(tracker: Tracker, pluginName: string, constructorOrUrl: any, callback?: (PluginConstructor) => void) {
  'use strict';
  var bb: BrowsingBeacon = this;
  if (!TypeChecker.isString(pluginName)) {
    throw new Error('pluginName must be string');
  }
  bb.plg = bb.plg || {};
  if (TypeChecker.isFunction(constructorOrUrl)) {
    bb.plg[pluginName] = constructorOrUrl;
  } else if (Strings.startsWith(constructorOrUrl, '//')) {
    loadPluginFromUrl(bb, pluginName, constructorOrUrl);
  }
}
var queue = [];
function loadPluginFromUrl(bb: BrowsingBeacon, pluginName: string, pluginUrl: string) {
  'use strict';
  function next() {
    var script = document.createElement('script');
    script.async = true;
    script.src = pluginUrl;
    var beforeTag = document.getElementsByTagName('script')[0];
    beforeTag.parentNode.insertBefore(script, beforeTag);
    window['__BBPluginCallback'] = function(generator) {
      generator(bb, function(err, PluginConstructor) {
        if (err) {
          throw err;
        }
        bb.plg[pluginName] = PluginConstructor;
      });
      if (queue.length > 0) {
        queue.shift()();
      } else { // queue 消化完了
        window['__BBPluginCallback'] = void 0;
      }
    };
  }
  if (!TypeChecker.isFunction(window['__BBPluginCallback'])) {
    next();
  } else {
    queue.push(next);
  }
}
