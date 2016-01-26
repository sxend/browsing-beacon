let taskQueue = [];
export default function() {
  let bb = this;
  let arg = [].slice.call(arguments);
  if ('string' === typeof arg[0]) {
    taskQueue.push({
      endpoint: bb.c.endpoint,
      message: arg[0]
    });
  }
  // TODO impl
};

setInterval(function() {
  let length = taskQueue.length;
  for (let i = 0; i < length; i++) {
    emitNow(taskQueue.shift(), i);
  }
}, 1000);

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
