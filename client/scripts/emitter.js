function emitNow(task) {
  var parser = document.createElement('a');
  parser.href = location.href;
  var envelope = {
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
  document.createElement('img').src = task.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getTime()
}

module.exports = function(batchInterval) {
  var taskQueue = [];
  setInterval(function() {
    while (taskQueue.length > 0) {
      emitNow(taskQueue.shift());
    }
  }, batchInterval || 1000);
  return {
    emit: function(endpoint, message) {
      taskQueue.push({
        endpoint: endpoint,
        message: message
      });
    }
  }
};
