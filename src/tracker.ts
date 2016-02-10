import {isFunction, isString, isObject} from './utils/type-checker';
import {DefaultModel, Model} from './model';
import {Tasks} from './tasks';
import {BrowsingBeacon} from './browsing-beacon';
import {Objects} from './utils/objects';

export default class Tracker {
  public static DEFAULT_NAME = "t0";
  private bb: BrowsingBeacon;
  private tasks = Tasks.apply(this);
  private model: Model;
  constructor(bb: BrowsingBeacon, fieldObject: any) {
    this.bb = bb;
    this.model = new DefaultModel(fieldObject);
  }
  get(key: string): any {
    return Objects.firstDefinedValue(this.model.get(key), this.tasks[key]);
  }
  set(keyOrField: any, value: any): void {
    if (isObject(keyOrField)) {
      Object.keys(keyOrField).forEach((key) => {
        this.set(key, keyOrField[key]);
      });
    } else if (isString(keyOrField)) {
      if (this.tasks.hasOwnProperty(keyOrField)) {
        this.tasks[keyOrField] = value;
      } else {
        this.model.set(keyOrField, value);
      }
    }
  }
  send(hitType: string, ...fields: any[]): void {
    var fieldsObject: any = {};
    if (isObject(fields[fields.length - 1])) {
      fieldsObject = fields[fields.length - 1];
      fields = fields.slice(0, fields.length - 1);
    }

    fieldsObject.hitType = hitType;
    fields.forEach((field, index) => {
      fieldsObject[String(index)] = field;
    });
    var model = new DefaultModel(fieldsObject, this.model);
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
