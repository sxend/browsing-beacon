declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';
import {isString} from '../utils/type-check';
import {extend} from '../utils/objects';
import Cookies from '../utils/cookies';

// bb('send', 'pageview');
// bb('send', 'event', {'name': 'click'}, {transport: 'strict'});
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
  var isAsync = true;
  if (!transport || transport === 'auto') {
    transport = "img";
  } else if (transport === 'strict') {
    transport = 'xhr';
    isAsync = false;
  }

  var analyticsData = new AnalyticsData(bb, hitType, fields, config);
  var parameter = analyticsData.toParameter();
  switch (transport) {
    case "beacon":
      navigatorBeacon(endpoint, parameter);
      break;
    case "xhr":
      xhrBeacon(endpoint, parameter, isAsync);
      break;
    case "img":
    default:
      imgBeacon(endpoint, parameter);
  }
  putMarker(hitType);
}
function putMarker(hitType) {
  'use strict';
  Cookies.setItem(`marker:${hitType}`, Number(Cookies.getItem(`marker:${hitType}`)) + 1 || 0);
}
function addMarkerParam(map: any, hitType): void {
  'use strict';
  map[`marker:${hitType}`] = Cookies.getItem(`marker:${hitType}`);
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
    var parameterMap = this.createParameterMap();
    var parameter = Object.keys(parameterMap).map(function(key) {
      return `${key}=${encodeURIComponent(JSON.stringify(parameterMap[key])) }`;
    }).join('&') + '&' + this.toDateParam();
    return parameter;
  }
  private toDateParam(): string {
    return 'z=' + Date.now();
  }
  private createParameterMap(): any {
    var map: any = {
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
      dt: document.title,
      marker: Cookies.getItem(`marker:${this.hitType}`)
    }; // 基本データ
    addMarkerParam(map, this.hitType);
    return extend(this.fields, map);
  }
}

function imgBeacon(endpoint: string, parameter: string): void {
  'use strict';
  document.createElement('img').src = `${endpoint}?${parameter}`;
}

function xhrBeacon(endpoint: string, parameter: string, isAsync: boolean): void {
  'use strict';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${endpoint}?${parameter}`, isAsync);
  if (isAsync) {
    xhr.timeout = 1000;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint: string, parameter: string): void {
  'use strict';
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, parameter);
  }
}
