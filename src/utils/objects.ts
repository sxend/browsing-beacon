import {isObject} from '../utils/type-check';

export function extend(child, parent) {
  'use strict';
  child = child || {};
  parent = parent || {};
  var childKeys = Object.keys(child);
  var parentKeyes = Object.keys(parent);
  var keys = childKeys.concat(parentKeyes).filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });
  var result = {};
  keys.forEach(function(key) {
    var value = child[key] === void 0 ? parent[key] : child[key];
    if (isObject(value)) {
      value = extend(child[key], parent[key]);
    }
    result[key] = value;
  });
  return result;
}

export function toObject(o: any): any {
  'use strict';
  return isObject(o) ? o : undefined;
}
