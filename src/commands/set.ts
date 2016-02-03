import Config from '../config/index';
import {BBObject} from '../index';
import {isString, isObject} from '../utils/type-check';

export default function set(key: any, value: any): void {
  if (isObject(key)) {
    Config.setConfig(key);
  } else if (isString(key)) {
    var option = {};
    option[key] = value;
    Config.setConfig(option);
  }
}
