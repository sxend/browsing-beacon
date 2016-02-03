import defaults from './defaults';
import {isObject} from '../utils/type-check';

export default class Config {
  private static isConfigured: boolean = false;
  private static config: any;
  public static getConfig(option?: any) {
    if (!this.isConfigured) {
      throw new Error("bb object is not configured yet!! please call 'create' command with options.");
    }
    return option ? extend(option, this.config) : this.config;
  }
  public static setConfig(option) {
    this.config = extend(option, this.config ? this.config : defaults);
    if (this.config) {
      this.isConfigured = true;
    }
  }
}

function extend(child, parent) {
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
