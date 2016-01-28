import prd from './prd';
import stg from './stg';
import defaults from './defaults';

export default class Config {
  static getConfig(bb, option) {
    let environments = extend(bb.c, extend(bb.isProduction() ? prd : stg, defaults));
    return extend(option, environments);
  }
}

function extend(child, parent) {
  child = child || {};
  parent = parent || {};
  let childKeys = Object.keys(child);
  let parentKeyes = Object.keys(parent);
  let keys = childKeys.concat(parentKeyes).filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });
  let result = {};
  keys.forEach(function(key) {
    result[key] = child[key] || parent[key];
  });
  return result;
}
