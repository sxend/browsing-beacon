import {extend} from '../utils/objects';

export default class HitType {
  public name: string;
  protected fields: any;
  static resolve(name: string, fields: any): HitType {
    switch (name) {
      case "pageview":
        return new PageView(fields);
      case "event":
        return new Event(fields);
    }
    return new HitType(name, fields);
  }
  constructor(name, fields) {
    this.name = name;
    this.fields = fields;
  }
  withProtocolParams(params: any): any {
    var specialParams = {};
    // TODO 必須項目埋める
    return extend(specialParams, params);
  }
}

class PageView extends HitType {
  constructor(fields) {
    super("pageview", fields);
  }
  withProtocolParams(params) {
    return super.withProtocolParams(params);
  }
}
class Event extends HitType {
  constructor(fields) {
    super("event", fields);
  }
  withProtocolParams(params) {
    var specialParams = super.withProtocolParams(params);
    specialParams['ec'] = this.fields['eventCategory'] || "";
    specialParams['ea'] = this.fields['eventAction'] || "";
    specialParams['el'] = this.fields['eventLabel'] || "";
    specialParams['ev'] = this.fields['eventValue'] || "";
    return extend(specialParams, params);
  }
}
