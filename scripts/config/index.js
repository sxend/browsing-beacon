import prd from './prd';
import stg from './stg';
import bb from '../';
export default class Config {
  static getConfig (){
    bb.isProduction() ? prd : stg;
  }
}
