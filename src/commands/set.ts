import Config from '../config/index';
import {isString} from '../utils/type-check';

// bb('set', 'key', 'value');
// bb('set', { 'key' : 'value' });
export default function set(key: any, value: any): void {
  'use strict';
  var option = key;
  if (isString(key)) {
    option = {};
    option[key] = value;
  }
  Config.setConfig(option);
}
