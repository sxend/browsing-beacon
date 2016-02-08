export default class Model {
  data: any = [];
  get(key: string): any {
    return this.data[key];
  }
  set(key: string, value: any): void {
    this.data[key] = value;
  }
}
