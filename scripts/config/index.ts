import defaults from './defaults.ts';

export default class Config {
  private static isConfigured: boolean = false;
  private static config: any;
  public static getConfig(option?: any) {
    if (!this.isConfigured) {
      throw new Error("bb object is not configured yet!! please call 'configure' command with options.");
    }
    return option ? extend(option, this.config): this.config;
  }
  public static setConfig(option) {
    this.config = extend(option, defaults);
    if (this.config) {
      this.isConfigured = true;
    }
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
    result[key] = child[key] === void 0 ? parent[key] : child[key];
  });
  return result;
}
