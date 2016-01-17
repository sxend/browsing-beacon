(function() {
  // initialize
  Beacon.configure({
    endpoint: "//localhost:9000/beacon",
    batchInterval: 1000
  });

  // inview event
  var inviewEvent = new Beacon.Events.InView({
    querySelector: '.example-class'
  });
  Beacon.Event.watch(inviewEvent, function(context) {
    this.emit(this.element.innerHTML + " is inview!!!");
  });
  // Beacon.Event.watch('.example-class', function(context) {
  //   switch (this.event.type) {
  //     case 'click':
  //       this.emit("click event!!!");
  //       break;
  //     default:
  //   }
  // });

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
    querySelector: '.input-form'
  });
  Beacon.Event.watch(exampleEvent, function(context) {
    this.emit("text changed.");
  });

})();
