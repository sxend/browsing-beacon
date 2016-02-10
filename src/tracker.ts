import {isFunction, isString, isObject} from './utils/type-checker';
import {DefaultModel, Model} from './model';
import {Tasks} from './tasks';
import {BrowsingBeacon} from './browsing-beacon';
import {Objects} from './utils/objects';
import plugins from './plugins';
import {registerPlugin} from './plugins';

export default class Tracker {
  public static DEFAULT_NAME = "t0";
  private bb: BrowsingBeacon;
  private tasks = Tasks.apply(this);
  model: Model;
  constructor(bb: BrowsingBeacon, fieldObject: any) {
    this.bb = bb;
    this.model = new DefaultModel(fieldObject);
    this.initializeBuiltinPlugins();
  }
  private initializeBuiltinPlugins() {
    Object.keys(plugins).forEach((key) => {
      try {
        this.bb('provide', key, plugins[key]);
        registerPlugin(this.bb, this, key, {});
      } catch (e) {
        throw e;
      }
    });
  }
  get(key: string): any {
    return Objects.firstDefinedValue(this.model.get(key), this.tasks[key]);
  }
  set(key: string, value: any): void {
    if (isFunction(this.tasks[key])) {
      this.tasks[key] = value;
    } else {
      this.model.set(key, value);
    }
  }
  send(...fields: any[]): void {
    var model = new DefaultModel({}, this.model);
    fields.forEach((field, index) => {
      if (isString(field)) {
        model.set(String(index), field, true);
      } else if (isObject(field)) {
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
    if (isFunction(this.tasks[name])) {
      this.tasks[name](model);
    }
  }
}
