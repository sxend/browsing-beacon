export default class Model {
  protected data: any = [];
  parent: Model;
  constructor(parent: Model = NoOpModel.INSTANCE) {
    this.parent = parent;
  }
  get(key: string): any {
    return this.data[key] || this.parent.get(key);
  }
  set(key: string, value: any, temporary: boolean = false): void {
    this.data[key] = value;
    if (!temporary) {
      this.parent.set(key, value, temporary);
    }
  }
}

class NoOpModel extends Model {
  static INSTANCE = new NoOpModel();
  get(key: string): any {
    return void 0;
  }
  set(key: string, value: any, temporary: boolean = false) {
    return void 0;
  }
}
