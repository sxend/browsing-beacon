import prd from './prd';
import stg from './stg';
export default class Config {
  static getConfig (){
    isProduction() ? prd : stg;
  }
  static isProduction() {
    return !!process.env.TO_PRODUCTION;
  }
}
