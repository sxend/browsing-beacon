(function() {
  // initialize
  Beacon.configure({
    endpoint: "//localhost:9000/beacon",
    batchInterval: 1000
  });

  // inview event
  let inviewEvent = new Beacon.Events.InView({
    querySelector: 'body'
  });
  Beacon.Events.watch(inviewEvent, function(element, event, callback) {
    this; // context object ({}). generate every watch element.
    callback(inviewEvent.querySelector + " send inview event!!!");
  });

  // original events
  Beacon.Events.register({
    name: 'Mouseover',
    handler: function(element, callback) {
      this; // context object
      element.addEventListener('mouseover', function(event) {
        // event type, context handling.
        callback(event);
      });
    }
  });
  let exampleEvent = new Beacon.Events.Mouseover({
    querySelector: 'img'
  });
  Beacon.Events.watch(exampleEvent, function(element, event, callback) {
    this; // context object
    callback(exampleEvent.querySelector + " send mouseover event!!!");
  });

})();
