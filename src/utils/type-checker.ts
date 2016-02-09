export module TypeChecker {
  'use strict';
  export function isFunction(o: any): boolean {
    return typeCheck(o, "[object Function]");
  }

  export function isNumber(o: any): boolean {
    return typeCheck(o, "[object Number]");
  }

  export function isArray(o: any): boolean {
    return typeCheck(o, "[object Array]");
  }

  export function isString(o: any): boolean {
    return typeCheck(o, "[object String]");
  }

  export function isObject(o: any): boolean {
    return typeCheck(o, "[object Object]");
  }

  export function isUndefined(o: any): boolean {
    return o === void 0;
  }

  function typeCheck(o: any, typeString: string): boolean {
    return o !== void 0 && o !== null && typeString === Object.prototype.toString.call(Object(o));
  }
}
