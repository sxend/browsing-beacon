export function configure(bb, args) {
  if (!args) {
    bb.log("empty arguments is invalid");
    return;
  }
  let options = {};
  if ('string' === typeof args) {
    options.url = args;
  } else {
    options = args;
  }
  bb.log(options);
}
