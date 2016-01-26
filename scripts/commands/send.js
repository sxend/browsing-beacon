
export default function(message) {
  let bb = this;
  emit(bb.c.endpoint, message);
};

setInterval(function() {
  let length = taskQueue.length;
  for (let i = 0; i < length; i++) {
    emitNow(taskQueue.shift(), i);
  }
}, 1000);

function emit(endpoint, message) {
  let envelope = new Envelope(message);
  document.createElement('img').src = `${endpoint}?${envelope.toQueryParam()}`;
}
class Envelope {
  constructor(message){
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
  toQueryParam() {
    return `envelope=${JSON.stringify({message: this.message, url: this.url})}&z=${new Date().getTime()}`
  }
}
