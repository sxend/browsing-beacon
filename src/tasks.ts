declare var navigator: any;
import Tracker from './tracker';
import {Model} from './model';
import {TypeChecker} from './utils/type-checker';

export module Tasks {
  'use strict';
  export function apply(tracker: Tracker) {
    return {
      previewTask: previewTask.bind(tracker),
      checkProtocolTask: checkProtocolTask.bind(tracker),
      validationTask: validationTask.bind(tracker),
      checkStorageTask: checkStorageTask.bind(tracker),
      historyImportTask: historyImportTask.bind(tracker),
      samplerTask: samplerTask.bind(tracker),
      buildHitTask: buildHitTask.bind(tracker),
      sendHitTask: sendHitTask.bind(tracker),
      timingTask: timingTask.bind(tracker)
    };
  }
  function previewTask(model: Model) {
  }
  function checkProtocolTask(model: Model) {
  }
  function validationTask(model: Model) {
  }
  function checkStorageTask(model: Model) {
  }
  function historyImportTask(model: Model) {
  }
  function samplerTask(model: Model) {
  }
  function buildHitTask(model: Model) {
  }
  function sendHitTask(model: Model) {
    var trackingId = model.get('trackingId');
    var hitType = model.get('0') || model.get('hitType');
    sendBeacon(trackingId, hitType, model);
  }
  function timingTask(model: Model) {
  }
}

function sendBeacon(tid: string, hitType: string, model: Model): void {
  'use strict';
  var endpoint = model.get('endpoint');
  var transport = model.get('transport');
  var isAsync = true;
  if (!transport || transport === 'auto') {
    transport = "img";
  } else if (transport === 'strict') {
    transport = 'xhr';
    isAsync = false;
  }

  var analyticsData = new AnalyticsData(tid, hitType, model);
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
  private tid: string;
  private hitType: string;
  private model: Model;
  constructor(tid: string, hitType: string, model: Model) {
    this.tid = tid;
    this.hitType = hitType;
    this.model = model;
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
      tid: this.tid,
      t: this.hitType,
      cid: this.model.get('cid'),
      uid: this.model.get('uid'),
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
