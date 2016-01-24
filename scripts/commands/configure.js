export default function(bb, args) {
  if (!args) {
    bb.log("empty arguments is invalid");
    return;
  }
  let options = {};
  if ('string' === typeof args[0]) {
    options.id = args[0]
    options.plugins = args.slice(1, args.length);
  } else {
    options = args;
  }

  options.plugins.forEach(function(url, index) {
    let script = document.createElement('script');
    script.async = 1;
    script.src = url;
    let beforeTag = document.getElementsByTagName('script')[0];
    beforeTag.parentNode.insertBefore(script, beforeTag);
    window.__BBConfigureCallback = (window.__BBConfigureCallback || function(handler) {
      handler(bb, options);
    });
  });
}
