export function isFunction(o: any): boolean {
  'use strict';
  return typeCheck(o, "[object Function]");
}

export function isNumber(o: any): boolean {
  'use strict';
  return typeCheck(o, "[object Number]");
}

export function isArray(o: any): boolean {
  'use strict';
  return typeCheck(o, "[object Array]");
}

export function isString(o: any): boolean {
  'use strict';
  return typeCheck(o, "[object String]");
}

export function isObject(o: any): boolean {
  'use strict';
  return typeCheck(o, "[object Object]");
}

export function isUndefined(o: any): boolean {
  'use strict';
  return o === void 0;
}

function typeCheck(o: any, typeString: string): boolean {
  'use strict';
  return o !== void 0 && o !== null && typeString === Object.prototype.toString.call(Object(o));
}
