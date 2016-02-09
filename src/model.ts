import {Objects} from './utils/objects';

export interface Model {
  get(key: string): any;
  set(key: string, value: any, temporary?: boolean);
}

export class DefaultModel implements Model {
  protected data: any = {};
  parent: Model;
  constructor(fieldObject: any = {}, parent?: Model) {
    this.parent = parent ? parent : new NoOpModel();
    Object.keys(fieldObject).forEach((key) => {
      this.set(key, fieldObject[key], true);
    });
  }
  get(key: string): any {
    return Objects.firstDefinedValue(this.data[key], this.parent.get(key));
  }
  set(key: string, value: any, temporary: boolean = false): void {
    this.data[key] = value;
    if (!temporary) {
      this.parent.set(key, value, temporary);
    }
  }
}

class NoOpModel implements Model {
  get(key: string): any {
    return void 0;
  }
  set(key: string, value: any, temporary: boolean = false): void {
  }
}
