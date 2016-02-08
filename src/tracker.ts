import Model from './model';

export default class Tracker {
  model: Model;
  plugins: any = {};
  data: any = {};
  constructor() {
    this.model = new Model();
  }
  get(key: string): any {
    return this.data[key];
  }
  set(key: string, value: any): void {
    this.data[key] = value;
  }
  send(): void {

  }
}
