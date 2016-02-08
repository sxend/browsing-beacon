declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';
import {TypeChecker} from '../utils/type-checker';
import Cookies from '../utils/cookies';
import HitType from '../models/hittypes';
import Marks from '../utils/marks';

// bb('send', 'pageview');
// bb('send', 'event', {'name': 'click'}, {transport: 'strict'});
export default function send(hitType: string, fields?: any, option?: any): void {
  'use strict';
  var bb: BBObject = this;
  if (!TypeChecker.isString(hitType)) {
    throw new Error("hitType is required.");
  }

  sendBeacon(bb, HitType.resolve(hitType, fields), option || {});
};

function sendBeacon(bb: BBObject, hitType: HitType, option: any): void {
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

  var analyticsData = new AnalyticsData(bb, hitType, config);
  var queryString = analyticsData.toQueryString();
  switch (transport) {
    case "beacon":
      navigatorBeacon(endpoint, queryString);
      break;
    case "xhr":
      xhrBeacon(endpoint, queryString, isAsync);
      break;
    case "img":
    default:
      imgBeacon(endpoint, queryString);
  }
}
class AnalyticsData {
  private bb: BBObject;
  private hitType: HitType;
  private option: any;
  constructor(bb: BBObject, hitType: HitType, option: any) {
    this.bb = bb;
    this.hitType = hitType;
    this.option = option;
  }
  toQueryString() {
    var params = this.createProtocolParams();
    var queryString = Object.keys(params).map(function(key) {
      var value = params[key];
      return `${key}=${encodeURIComponent(TypeChecker.isString(value) ? value : JSON.stringify(value)) }`;
    }).join('&') + '&' + this.toDateParam();
    return queryString;
  }
  private toDateParam(): string {
    return 'z=' + Date.now();
  }
  private createProtocolParams(): any {
    var params: any = {
      v: 1,
      id: this.bb.id,
      t: this.hitType.name,
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
    }; // 基本データ
    params = this.hitType.withProtocolParams(params);
    params = Marks.withProtocolParams(this.hitType.name, params);
    return params;
  }
}

function imgBeacon(endpoint: string, queryString: string): void {
  'use strict';
  document.createElement('img').src = `${endpoint}?${queryString}`;
}

function xhrBeacon(endpoint: string, queryString: string, isAsync: boolean): void {
  'use strict';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `${endpoint}?${queryString}`, isAsync);
  if (isAsync) {
    xhr.timeout = 1000;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint: string, queryString: string): void {
  'use strict';
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${queryString}`, "");
  }
}
