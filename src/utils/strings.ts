
// http://stackoverflow.com/questions/280634/endswith-in-javascript
export module Strings {
  'use strict';
  export function endsWith(str, suffix) {

    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
}
