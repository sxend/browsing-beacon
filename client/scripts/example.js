(function() {
  // initialize
  Beacon.configure({
    endpoint: "//localhost:9000/beacon",
    batchInterval: 1000
  });

  // inview event
  var inviewEvent = new Beacon.Events.InView({
    querySelector: 'body'
  });
  Beacon.Event.watch(inviewEvent, function(context) {
    this.emit(inviewEvent.querySelector + " is inview!!!");
  });

  // original events
  Beacon.Event.register({
    name: 'Example',
    handler: function(element, context, callback) {
      element.addEventListener('change', function(event) {
        if (!context.text) context.text = element.innerText;
        if (context.text != element.innerText) {
          context.text = element.innerText;
          callback(context);
          return;
        }
      });
    }
  });
  var exampleEvent = new Beacon.Events.Example({
    querySelector: 'body'
  });
  Beacon.Event.watch(exampleEvent, function(context) {
    this.emit("text changed.");
  });

})();
