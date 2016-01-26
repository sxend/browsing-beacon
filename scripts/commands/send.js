export default function(message) {
  let bb = this;
  emit(bb.c.endpoint, message);
};

function emit(endpoint, message) {
  let envelope = new Envelope(message);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${endpoint}?${toDateParam()}`, envelope.toAnalyticsData());
  } else {
    document.createElement('img').src = `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`;
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
