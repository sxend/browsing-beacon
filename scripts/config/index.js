import prd from './prd';
import stg from './stg';

export default class Config {
  constructor(id, plugins, endpoint, transport) {
    this.id = id;
    this.plugins = plugins;
    this.endpoint = endpoint;
    this.transport = transport;
  }
  static getConfig(bb, option) {
    let environments = bb.isProduction() ? prd : stg;
    return new Config(
      option.id || environments.id || `Anonymous-${location.href}`, // FIXME idのデフォルト生成方法検討
      option.plugins || environments.plugins || [],
      option.endpoint || environments.endpoint || '//0.0.0.0/beacon',
      option.transport || environments.transport || 'auto'
    );
  }
}
