__BBPluginCallback(function(bb, context) {
  bb.log("plugin0 loaded.");
  bb.log(context);
  var element = document.body.querySelector('#h2-element');
  element.addEventListener('mouseover', function(e) {
    bb('send', 'h2 event!!!!');
  })
});
