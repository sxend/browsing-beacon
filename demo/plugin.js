__BBPluginCallback(function(bb, context) {
  var onLinkClick = new bb.ev.Click({
    querySelector: '.link-elements'
  });
  bb('watch', onLinkClick, function(e) {
    bb('send', 'link click');
  });
});
