export default function(message, option) {
  let bb = this;
  emit(bb, message, option || {});
};

function emit(bb, message, option) {
  let endpoint = bb.c.endpoint;
  let transport = option.transport || bb.c.transport;
  if (!transport || transport == 'auto') {
    transport = "img";
  } else if (transport == 'strict') {
    transport = 'xhr';
    option.async = false;
  }

  let envelope = new Envelope(message);
  switch (transport) {
    case "beacon":
      navigatorBeacon(endpoint, envelope, option);
      break;
    case "xhr":
      xhrBeacon(endpoint, envelope, option);
      break;
    case "img":
    default:
      imgBeacon(endpoint, envelope, option);
  }
}

function imgBeacon(endpoint, envelope, option) {
  document.createElement('img').src = `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`;
}

function xhrBeacon(endpoint, envelope, option) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`, !!option.async);
  xhr.send();
}

function navigatorBeacon(endpoint, envelope, option) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${toDateParam()}`, envelope.toAnalyticsData());
  }
}

function toDateParam() {
  return `z=${new Date().getTime()}`;
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
    return JSON.stringify({
      message: this.message,
      url: this.url
    });
  }

}
