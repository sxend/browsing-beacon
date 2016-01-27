export default function(message) {
  let bb = this;
  emit(bb, message);
};

function emit(bb, message) {
  let endpoint = bb.c.endpoint;
  let transport = (!bb.c.transport || bb.c.transport == 'auto') ? "img" : bb.c.transport;

  let envelope = new Envelope(message);
  switch (transport) {
    case "beacon":
      navigator.sendBeacon(`${endpoint}?${toDateParam()}`, envelope.toAnalyticsData());
      break;
    case "xhr":
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`, false);
      xhr.send();
      break;
    // case "js":
    //   let sc = document.createElement('script');
    //   sc.src = `${endpoint}?envelope=${envelope.toAnalyticsData()}&${toDateParam()}`;
    //   document.head.appendChild(sc);
    //   break;
    case "img":
    default:
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
