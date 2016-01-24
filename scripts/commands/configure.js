export default function (bb, args) {
  if (!args) {
    bb.log("empty arguments is invalid");
    return;
  }
  let options = {};
  if ('string' === typeof args[0]) {
    options.url = args[0];
  } else {
    options = args;
  }

}
