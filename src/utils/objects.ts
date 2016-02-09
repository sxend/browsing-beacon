import {TypeChecker} from '../utils/type-checker';

export module Objects {
  'use strict';
  export function extend(child, parent) {
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
      if (TypeChecker.isObject(value)) {
        value = extend(child[key], parent[key]);
      }
      result[key] = value;
    });
    return result;
  }

  export function toObject(o: any): any {
    return TypeChecker.isObject(o) ? o : undefined;
  }

  export function firstDefinedValue(...args: any[]): any {
    if (args.length === 0) {
      return;
    }
    for (var i = 0; i < args.length; i++) {
      if (!TypeChecker.isUndefined(args[i])) {
        console.log(args[i]);
        return args[i];
      }
    }
  }
}
