(function(window, document, script, beaconjs, name, tag, beforeTag) {
  window['BrowsingBeaconObject'] = name,
    window[name] = window[name] || function() {
      (window[name].q = window[name].q || []).push(arguments);
    },
    window[name].l = 1 * new Date(),
    tag = document.createElement(script),
    tag.async = 1,
    tag.src = beaconjs,
    beforeTag = document.getElementsByTagName(script)[0];
  beforeTag.parentNode.insertBefore(tag, beforeTag);
})(window, document, 'script', '//stat.arimit.su/browsing-beacon/bb.js', 'bb');
bb('create', '//stat.arimit.su/browsing-beacon/demo/config.js');
