export default class TypeCheck {
  static isFunction(a) {
    return "function" == typeof a;
  }

  static isArray(a) {
    return "[object Array]" == Object.prototype.toString.call(Object(a));
  }

  static isString(a) {
    return void 0 != a && -1 < (a.constructor + "").indexOf("String");
  }
}
