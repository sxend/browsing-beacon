export default function() {
  let bb = this;
  let args = [].slice.call(arguments);
  let event = args.shift();

  if (event && event.isBBEvent) {
    let callback = args.shift();
    event.handle(callback);
  }

}
