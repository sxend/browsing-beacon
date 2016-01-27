__BBPluginCallback(function(bb, context) {
  var onLinkClick = new bb.ev.Click({
    querySelector: 'a',
    useCapture: true
  });
  bb('watch', onLinkClick, function(e) {
    bb('send', 'link click');
  });
  var onLinkMouseover = new bb.ev.Mouseover({
    querySelector: 'a',
    useCapture: true
  });
  bb('watch', onLinkMouseover, function(e) {
    bb('send', 'link mouseover');
  });
});
