declare var navigator: any;
import Config from '../config/index.ts';

export function send(message, option): void {
  var bb = this;
  emit(bb, message, option || {});
};

function emit(bb, message, option): void {
  var config: any = Config.getConfig(bb, option);
  var endpoint = config.endpoint;
  var transport = config.transport;
  if (!transport || transport == 'auto') {
    transport = "img";
  } else if (transport == 'strict') {
    transport = 'xhr';
    config.async = false;
  }

  var envelope = new Envelope(message);
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
  document.createElement('img').src = `${endpoint}?envelope=${envelope.toAnalyticsData() }&${toDateParam() }`;
}

function xhrBeacon(endpoint, envelope, config): void {
  var xhr = new XMLHttpRequest();
  var isAsync = (config.async === void 0) ? true : config.async;
  xhr.open("GET", `${endpoint}?envelope=${envelope.toAnalyticsData() }&${toDateParam() }`, isAsync);
  if (isAsync) {
    xhr.timeout = config.sendTimeout;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint, envelope, config): void {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${toDateParam() }`, envelope.toAnalyticsData());
  }
}

function toDateParam(): string {
  return `z=${Date.now() }`;
}
class Envelope {
  public url: any;
  constructor(public message: any) {
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
      message: this.message,
      url: this.url
    }));
  }

}
