(function() {
  // initialize
  Beacon.configure({
    endpoint: "//example.com/beacon"
  });

  // standard events
  var exampleEvent = Beacon.Events.InView.extend({
    querySelector: '.example-class'
  });
  Beacon.watchEvent(exampleEvent, function(context) {
    this.emit(this.element.innerHTML + " is inview!!!");
  });
  Beacon.watchEvent('.example-class', function(context) {
    switch (this.event.type) {
      case 'click':
        this.emit("click event!!!");
        break;
      default:
    }
  });

  // original events
  Beacon.Events.register({
    name: 'Example',
    handler: function(context) {
      var element = this.element;
      if (!!context.text && context.text != element.innerText) {
        context.text = element.innerText;
        return element;
      }
      return;
    }
  }); // return Example Event constructor function
  var exampleEvent = Beacon.Events.Example.extend({
    querySelector: '.input-form'
  });
  Beacon.watchEvent(exampleEvent, function(context) {
    this.emit("text changed.");
  });

})();
