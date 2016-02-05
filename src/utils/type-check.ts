
export function isFunction(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object Function]" === Object.prototype.toString.call(Object(o));
}

export function isNumber(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object Number]" === Object.prototype.toString.call(Object(o));
}

export function isArray(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object Array]" === Object.prototype.toString.call(Object(o));
}

export function isString(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object String]" === Object.prototype.toString.call(Object(o));
}

export function isObject(o: any): boolean {
  'use strict';
  return o !== void 0 && o !== null && "[object Object]" === Object.prototype.toString.call(Object(o));
}
