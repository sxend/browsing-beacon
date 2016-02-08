declare var navigator: any;
import Config from './config/index';
import {TypeChecker} from './utils/type-checker';
import Cookies from './utils/cookies';
import Marks from './utils/marks';
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
    this.loadPlugins();
  }
  private loadPlugins() {
    this.get('plugins').forEach((url) => {
      var script = document.createElement('script');
      script.async = true;
      script.src = url;
      var beforeTag = document.getElementsByTagName('script')[0];
      beforeTag.parentNode.insertBefore(script, beforeTag);
      window['__BBPluginCallback'] = (window['__BBPluginCallback'] || function(handler) {
        handler(this.bb, this.model);
      });
    });
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
    var model = new DefaultModel(this.model);
    var fieldObject = {};
    fields.forEach((field, index) => {
      if (TypeChecker.isString(field)) {
        model.set(String(index), field, true);
      } else if (TypeChecker.isObject(field)) {
        Object.keys(field).forEach((key) => {
          fieldObject[key] = field[key];
          model.set(String(index), field, true);
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


function sendBeacon(tid: string, hitType: string, option: any): void {
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

  var analyticsData = new AnalyticsData(tid, hitType, config);
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
  private option: any;
  constructor(tid: string, hitType: string, option: any) {
    this.tid = tid;
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
      tid: this.tid,
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
