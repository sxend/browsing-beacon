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
  Beacon.Event.watch(inviewEvent, function(element, context) {
    this.emit(inviewEvent.querySelector + " send inview event!!!");
  });

  // original events
  Beacon.Event.register({
    name: 'Mouseover',
    handler: function(element, context, callback) {
      element.addEventListener('mouseover', function(event) {
        callback();
      });
    }
  });
  var exampleEvent = new Beacon.Events.Mouseover({
    querySelector: 'img'
  });
  Beacon.Event.watch(exampleEvent, function(element, context) {
    this.emit(exampleEvent.querySelector + " send mouseover event!!!");
  });

})();
