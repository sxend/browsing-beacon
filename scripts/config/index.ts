import prd from './prd.ts';
import stg from './stg.ts';
import defaults from './defaults.ts';

export default class Config {
  static getConfig(bb, option) {
    var environments = extend(bb.c, extend(bb.isProduction() ? prd : stg, defaults));
    return extend(option, environments);
  }
}

function extend(child, parent) {
  child = child || {};
  parent = parent || {};
  var childKeys = Object.keys(child);
  var parentKeyes = Object.keys(parent);
  var keys = childKeys.concat(parentKeyes).filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });
  var result = {};
  keys.forEach(function(key) {
    result[key] = child[key] || parent[key];
  });
  return result;
}
