declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';
import {isString} from '../utils/type-check';
import {extend} from '../utils/objects';
import Cookies from '../utils/cookies';

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

  var analyticsData = new AnalyticsData(bb, hitType, fields, config);
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
    xhr.timeout = 1000;
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
  private bb: BBObject;
  private hitType: string;
  private fields: any;
  private option: any;
  constructor(bb: BBObject, hitType: string, fields: any, option: any) {
    this.bb = bb;
    this.hitType = hitType;
    this.fields = fields;
    this.option = option;
  }
  toParameter() {
    var parameterMap = extend(this.fields, this.createParameterMap());
    var parameter = Object.keys(parameterMap).map(function(key) {
      return `${key}=${encodeURIComponent(JSON.stringify(parameterMap[key])) }`;
    }).join('&') + '&' + this.toDateParam();
    return parameter;
  }
  private toDateParam(): string {
    return 'z=' + Date.now();
  }
  private createParameterMap(): any {
    return {
      v: 1,
      id: this.bb.id,
      t: this.hitType,
      cid: Cookies.getItem("pfxid"),
      uid: Cookies.getItem("uid"),
      dr: document.referrer,
      wsw: window.parent.screen.width,
      wsh: window.parent.screen.height,
      vpw: window.innerWidth,
      vph: window.innerHeight,
      sd: window.screen.colorDepth,
      ul: window.navigator.language,
      dl: document.location.origin + document.location.pathname + document.location.search,
      dh: document.location.hostname,
      dp: document.location.pathname,
      cd: document.title,
      an: this.option['appName'] || "",
      aid: this.option['appId'] || "",
      av: this.option['appVersion'] || "",
      aiid: this.option['appInstallerId'] || "",
      opt: this.option,
    };
  }
}
