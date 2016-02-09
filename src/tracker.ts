import {TypeChecker} from './utils/type-checker';
import {DefaultModel, Model} from './model';
import {Tasks} from './tasks';
import {BrowsingBeacon} from './browsing-beacon';

export default class Tracker {
  private bb: BrowsingBeacon;
  private tasks = Tasks.apply(this);
  model: Model;
  plugins: any = {};
  data: any = {};
  constructor(bb: BrowsingBeacon, fieldObject: any) {
    this.bb = bb;
    this.model = new DefaultModel(fieldObject);
  }
  get(key: string): any {
    return this.model.get(key) || this.plugins[key] || this.tasks[key];
  }
  set(key: string, value: any): void {
    if (TypeChecker.isFunction(this.tasks[key])) {
      this.tasks[key] = value;
    } else {
      this.model.set(key, value);
    }
  }
  send(...fields: any[]): void {
    var model = new DefaultModel({}, this.model);
    fields.forEach((field, index) => {
      if (TypeChecker.isString(field)) {
        model.set(String(index), field, true);
      } else if (TypeChecker.isObject(field)) {
        Object.keys(field).forEach((key) => {
          model.set(key, field, true);
        });
      }
    });
    this.executeTask("previewTask", model);
    this.executeTask("checkProtocolTask", model);
    this.executeTask("validationTask", model);
    this.executeTask("checkStorageTask", model);
    this.executeTask("historyImportTask", model);
    this.executeTask("samplerTask", model);
    this.executeTask("buildHitTask", model);
    this.executeTask("sendHitTask", model);
    this.executeTask("timingTask", model);
  }
  private executeTask(name: string, model: Model) {
    if (TypeChecker.isFunction(this.tasks[name])) {
      this.tasks[name](model);
    }
  }
}
