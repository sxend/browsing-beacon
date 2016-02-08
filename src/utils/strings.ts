
// http://stackoverflow.com/questions/280634/endswith-in-javascript
export function endsWith(str, suffix) {
  'use strict';
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
