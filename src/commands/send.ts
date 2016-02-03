declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';
import {isString} from '../utils/type-check';
import {extend} from '../utils/objects';

export default function send(hitType: string, fields?: any, option?: any): void {
  'use strict';
  var bb: BBObject = this;
  if (!isString(hitType)) {
    throw new Error("hitType is required.");
  }
  sendBeacon(bb, hitType, fields || {}, option || {});
};

function sendBeacon(bb: BBObject, hitType: string, fields: any, option: any): void {
  'use strict';
  var config: any = Config.getConfig(option);
  var endpoint = config.endpoint;
  var transport = config.transport;
  if (!transport || transport === 'auto') {
    transport = "img";
  } else if (transport === 'strict') {
    transport = 'xhr';
    config.async = false;
  }

  var analyticsData = new AnalyticsData(bb.id, hitType, fields, config);
  switch (transport) {
    case "beacon":
      navigatorBeacon(endpoint, analyticsData, config);
      break;
    case "xhr":
      xhrBeacon(endpoint, analyticsData, config);
      break;
    case "img":
    default:
      imgBeacon(endpoint, analyticsData, config);
  }
}

function imgBeacon(endpoint, analyticsData, config): void {
  'use strict';
  document.createElement('img').src = `${endpoint}?${analyticsData.toParameter() }`;
}

function xhrBeacon(endpoint, analyticsData, config): void {
  'use strict';
  var xhr = new XMLHttpRequest();
  var isAsync = (config.async === void 0) ? true : config.async;
  xhr.open("GET", `${endpoint}?${analyticsData.toParameter() }`, isAsync);
  if (isAsync) {
    xhr.timeout = config.sendTimeout;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint, analyticsData, config): void {
  'use strict';
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, analyticsData.toParameter());
  }
}

class AnalyticsData {
  private id: string;
  private hitType: string;
  private fields: any;
  private option: any;
  constructor(id: string, hitType: string, fields: any, option: any) {
    this.id = id;
    this.hitType = hitType;
    this.fields = fields;
    this.option = option;
  }
  toParameter() {
    var map = this.createParameterMap();
    var parameter = Object.keys(map).map(function(key) {
      return `${key}=${encodeURIComponent(JSON.stringify(map[key])) }`;
    }).join('&') + '&' + this.toDateParam();
    return parameter;
  }
  private createParameterMap(): any {
    return extend(this.fields, this.option);
  }
  private toDateParam(): string {
    return 'z=' + Date.now();
  }
}
