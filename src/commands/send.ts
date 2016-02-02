declare var navigator: any;
import Config from '../config/index';
import {BBObject} from '../index';

export default function send(hitType: string, option?: any): void {
  'use strict';
  var bb: BBObject = this;
  emit(bb, hitType, option || {});
};

function emit(bb: BBObject, hitType: string, option: any): void {
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

  var envelope = new Envelope(hitType);
  switch (transport) {
    case "beacon":
      navigatorBeacon(endpoint, envelope, config);
      break;
    case "xhr":
      xhrBeacon(endpoint, envelope, config);
      break;
    case "img":
    default:
      imgBeacon(endpoint, envelope, config);
  }
}

function imgBeacon(endpoint, envelope, config): void {
  'use strict';
  document.createElement('img').src = `${endpoint}?envelope=${envelope.toAnalyticsData() }&${toDateParam() }`;
}

function xhrBeacon(endpoint, envelope, config): void {
  'use strict';
  var xhr = new XMLHttpRequest();
  var isAsync = (config.async === void 0) ? true : config.async;
  xhr.open("GET", `${endpoint}?envelope=${envelope.toAnalyticsData() }&${toDateParam() }`, isAsync);
  if (isAsync) {
    xhr.timeout = config.sendTimeout;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint, envelope, config): void {
  'use strict';
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${toDateParam() }`, envelope.toAnalyticsData());
  }
}

function toDateParam(): string {
  'use strict';
  return `z=${Date.now() }`;
}
class Envelope {
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
  toAnalyticsData() {
    return encodeURIComponent(JSON.stringify({
      hitType: this.hitType,
      url: this.url
    }));
  }

}
