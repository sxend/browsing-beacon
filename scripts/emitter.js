export default class Emitter {
  constructor(bb) {
    let emitter = this;
    emitter.bb = bb;
    emitter.taskQueue = [];
    setInterval(function() {
      let length = emitter.taskQueue.length;
      for(let i = 0;i < length; i++) {
        emitNow(emitter.taskQueue.shift(), i);
      }
    }, 1000);
  }
  emit(message){
    this.taskQueue.push({
      endpoint: this.bb.c.endpoint,
      message: message
    });
  }
}

function emitNow(task, i) {
  let parser = document.createElement('a');
  parser.href = location.href;
  let envelope = {
    ext: {
      message: task.message
    },
    url: {
      protocol: parser.protocol,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      hash: parser.hash
    }
  };
  document.createElement('img').src = task.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getTime() + "_" + i;
}
