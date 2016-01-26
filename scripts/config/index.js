import prd from './prd';
import stg from './stg';

export default class Config {
  static getConfig (bb){
    bb.isProduction() ? prd : stg;
  }
}
