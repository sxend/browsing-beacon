(function() {
  // initialize
  Beacon.configure({
    endpoint: "//localhost:9000/beacon",
    batchInterval: 1000
  });

  // inview event
  var inviewEvent = new Beacon.Events.InView({
    id: 'body-inview',
    querySelector: 'body'
  });
  Beacon.Events.watch(inviewEvent, function(element, event, callback) {
    this; // context object ({}). generate every watch element.
    callback(inviewEvent.querySelector + " send inview event!!!");
  });
  var anotherInverEvent = new Beacon.Events.InView({
    id: 'div-inview',
    querySelector: 'div'
  });
  Beacon.Events.watch([inviewEvent, anotherInverEvent], function(element, event, callback) {
    var context = this;
    context.events = context.events || [];
    if (!context.firstInview && context.event.id === inviewEvent.id) {
      context.events.push(event);
      context.firstInview = true;
    }
    if (!!context.firstInview && event.id === anotherInverEvent.id) {
      context.events.push(event);
      if (context.events.length > 10) {
        callback.apply(null, context.events);
      }
    }
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
  var exampleEvent = new Beacon.Events.Mouseover({
    querySelector: 'img'
  });
  Beacon.Events.watch(exampleEvent, function(element, event, callback) {
    this; // context object
    callback(exampleEvent.querySelector + " send mouseover event!!!");
  });

})();
