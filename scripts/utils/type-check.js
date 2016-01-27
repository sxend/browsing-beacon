export function isFunction(o) {
  return "function" == typeof o;
}

export function isNumber(o) {
  return "number" == typeof o;
}

export function isArray(o) {
  return "[object Array]" == Object.prototype.toString.call(Object(o));
}

export function isString(o) {
  return void 0 != o && -1 < (o.constructor + "").indexOf("String");
}
