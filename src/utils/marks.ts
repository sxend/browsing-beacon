import Cookies from './cookies';
import {extend} from '../utils/objects';

export default class Marks {

  static mark(data: any): void {
    Cookies.setItem(`mark:${data.hitType}:${data.key}`, JSON.stringify(data));
  }
  static withProtocolParams(hitType: string, params: any): any {
    var prefix = `mark:${hitType}:`;
    console.log(prefix);
    var dataList = Cookies.keys().filter(function(key) {
      console.log(key);
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
    console.log(specialParams);
    return extend(specialParams, params);
  }
}
