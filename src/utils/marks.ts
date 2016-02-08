import Cookies from './cookies';
import {Objects} from '../utils/objects';

export default class Marks {

  static mark(data: any): void {
    Cookies.setItem(`mark:${data.hitType}:${data.key}`, JSON.stringify(data));
  }
  static withProtocolParams(hitType: string, params: any): any {
    var prefix = `mark:${hitType}:`;
    var dataList = Cookies.keys().filter(function(key) {
      return key.indexOf(prefix) === 0;
    }).map(function(key) {
      return JSON.parse(Cookies.getItem(key));
    }); // dataList = [{key: bcl, value: hogehoge, remove: hogehoge}]
    var specialParams = {};
    dataList.forEach(function(data) {
      specialParams[data.key] = data.value;
      if (data.remove) {
        Cookies.removeItem(`mark:${data.hitType}:${data.key}`);
      }
    });
    return Objects.extend(specialParams, params);
  }
}
