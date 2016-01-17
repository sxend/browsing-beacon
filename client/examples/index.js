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
  Beacon.Event.watch(inviewEvent, function(element, event, callback) {
    this; // context object ({}). generate every watch element.
    callback(inviewEvent.querySelector + " send inview event!!!");
  });

  // original events
  Beacon.Event.register({
    name: 'Mouseover',
    handler: function(element, callback) {
      this; // context object
      element.addEventListener('mouseover', function(event) {
        // event type, context handling.
        callback(event);
      });
    }
  });
  var exampleEvent = new Beacon.Events.Mouseover({
    querySelector: 'img'
  });
  Beacon.Event.watch(exampleEvent, function(element, event, callback) {
    this; // context object
    callback(exampleEvent.querySelector + " send mouseover event!!!");
  });

})();
