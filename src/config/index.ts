import defaults from './defaults';
import {extend} from '../utils/objects';

export default class Config {
  private static isConfigured: boolean = false;
  private static config: any;
  public static getConfig(option?: any) {
    if (!this.isConfigured) {
      throw new Error("bb object is not configured yet!! please call 'create' command with options.");
    }
    return option ? extend(option, this.config) : this.config;
  }
  public static setConfig(option) {
    this.config = extend(option, this.config ? this.config : defaults);
    if (this.config) {
      this.isConfigured = true;
    }
  }
}
