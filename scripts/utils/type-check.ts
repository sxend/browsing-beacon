export function isFunction(o: any): boolean {
  return "function" == typeof o;
}

export function isNumber(o: any): boolean {
  return "number" == typeof o;
}

export function isArray(o: any): boolean {
  return "[object Array]" == Object.prototype.toString.call(Object(o));
}

export function isString(o: any): boolean {
  return void 0 != o && -1 < (o.constructor + "").indexOf("String");
}
