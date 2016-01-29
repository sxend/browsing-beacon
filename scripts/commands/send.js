import Config from '../config';

export default function(message, option) {
  let bb = this;
  emit(bb, message, option || {});
};

function emit(bb, message, option) {
  let config = Config.getConfig(bb, option);
  let endpoint = config.endpoint;
  let transport = config.transport;
  if (!transport || transport == 'auto') {
    transport = "img";
  } else if (transport == 'strict') {
    transport = 'xhr';
    config.async = false;
  }

  let envelope = new Envelope(message);
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

function imgBeacon(endpoint, envelope, config) {
  document.createElement('img').src = `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`;
}

function xhrBeacon(endpoint, envelope, config) {
  let xhr = new XMLHttpRequest();
  let isAsync = (config.async === void 0) ? true : config.async;
  xhr.ontimeout = function () {
    console.error("The request for " + url + " timed out.");
  };
  xhr.open("GET", `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`, isAsync);
  if(isAsync){
    xhr.timeout = config.sendTimeout;
  }
  xhr.send(null);
}

function navigatorBeacon(endpoint, envelope, config) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${toDateParam()}`, envelope.toAnalyticsData());
  }
}

function toDateParam() {
  return `z=${Date.now()}`;
}
class Envelope {
  constructor(message) {
    this.message = message;
    let parser = document.createElement('a');
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
