declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';
import {isString, isObject} from '../utils/type-check';

export default function send(): void {
  'use strict';
  var bb: BBObject = this;
  var args = [].slice.call(arguments);
  var hitType: string = args.shift();
  var fields = [];
  var option = {};
  if (!isString(hitType)) {
    throw new Error("hitType is required.");
  }
  for (var i = 0; i < args.length; i++) {
    if (isString(args[i])) {
      fields.push(args[i]);
    } else if (isObject(args[i])) {
      option = args[i];
    }
  }
  sendBeacon(bb, hitType, fields, option);
};

function sendBeacon(bb: BBObject, hitType: string, fields: string[], option: any): void {
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

  var analyticsData = new AnalyticsData(hitType);
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
  private version: number = 1;
  public url: any;
  constructor(public hitType: any) {
    var parser = document.createElement('a');
    parser.href = location.href;
    this.url = {
      protocol: parser.protocol,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      hash: parser.hash
    };
  }
  toParameter() {
    var map = this.createParameterMap();
    var parameter = Object.keys(map).map(function(key) {
      return `${key}=${encodeURIComponent(JSON.stringify(map[key])) }`;
    }).join('&') + '&' + this.toDateParam();
    return parameter;
  }
  private createParameterMap(): any {
    return {
      v: this.version,
      url: this.url,
      t: this.hitType
    };
  }
  private toDateParam(): string {
    'use strict';
    return 'z=' + Date.now();
  }
}
