module.exports = function(internal) {
  function Emitter() {
    let emitter = this;
    emitter.taskQueue = [];
    setInterval(function() {
      while (emitter.taskQueue.length > 0) {
        emitNow(emitter.taskQueue.shift());
      }
    }, internal.config.batchInterval || 1000);
  }
  internal.Emitter = Emitter;

  Emitter.prototype.emit = function(message) {
    this.taskQueue.push({
      endpoint: internal.config.endpoint,
      message: message
    });
  };
  return Emitter;
}

function emitNow(task) {
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
  document.createElement('img').src = task.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getTime();
}
