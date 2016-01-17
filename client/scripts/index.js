(function(Beacon) {
  var internal = {
    config: {
      endpoint: null,
      batchInterval: 1000
    },
    tasks: []
  }

  Beacon.Events = {};
  Beacon.Event = {};

  Beacon.configure = function(config) {
    internal.config = config;
  };

  function createEventConstructor(handler) {
    function F(eventConfig) {
      this.querySelector = eventConfig.querySelector;
      this.handler = handler;
    };
    return F;
  }

  function emitNow(task) {
    var parser = document.createElement('a');
    parser.href = location.href;
    var envelope = {
      ext: {
        task: task
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
    document.createElement('img').src = internal.config.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getTime()
  }

  function generateBindObject() {
    return {
      emit: function(task) {
        internal.tasks.push(task);
      }
    };
  }
  Beacon.Event.register = function(newEvent) {
    Beacon.Events[newEvent.name] = createEventConstructor(newEvent.handler);
  }
  Beacon.Event.watch = function(target, callback) {
    var elements = document.querySelectorAll(target.querySelector);

    [].slice.call(elements).forEach(function(element) {
      console.log('watch start.' + target.querySelector);
      var context = {};
      target.handler(element, context, function() {
        callback.bind(generateBindObject())(element, context);
      });
    });
  }
  Beacon.Event.register({
    name: 'InView',
    handler: function(element, context, callback) {
      element.addEventListener('click', function(event) {
        callback();
      })
    }
  });

  function emitBatchStart() {
    setInterval(function() {
      while (internal.tasks.length > 0) {
        emitNow(internal.tasks.shift());
      }
    }, internal.config.batchInterval);
  };
  emitBatchStart();

  window.Beacon = Beacon;
})(window.Beacon || {});
