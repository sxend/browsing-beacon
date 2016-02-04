import Marker from '../utils/marker';

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
  createParameterMap(): any {
    return {};
  }
}

class PageView extends HitType {
  constructor(fields) {
    super("pageview", fields);
  }
  createParameterMap(): any {
    var parameterMap = super.createParameterMap();
    var beforeClickLocation = Marker.find('beforeClickLocation');
    parameterMap['isContinuedAccess'] = document.referrer === beforeClickLocation;
    if (document.referrer === beforeClickLocation) {
      Marker.remove('beforeClickLocation');
    }
    return parameterMap;
  }
}
class Event extends HitType {
  constructor(fields) {
    super("event", fields);
  }
}
