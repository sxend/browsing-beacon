
export function isFunction(o: any): boolean {
  'use strict';
  return "function" === typeof o;
}

export function isNumber(o: any): boolean {
  'use strict';
  return "number" === typeof o;
}

export function isArray(o: any): boolean {
  'use strict';
  return "[object Array]" === Object.prototype.toString.call(Object(o));
}

export function isString(o: any): boolean {
  'use strict';
  return void 0 !== o && -1 < (o.constructor + "").indexOf("String");
}

export function isObject(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object Object]" === Object.prototype.toString.call(Object(o));
}

export function toObject(o: any): any {
  'use strict';
  return isObject(o) ? o : undefined;
}
