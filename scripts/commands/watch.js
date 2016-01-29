export default function() {
  let bb = this;
  let args = [].slice.call(arguments);
  let event = args.shift();
  let context = {};
  if (event && event.isBBEvent) {
    let callback = args.shift();
    setInterval(() => {
      event.handle(context, callback);
    }, 50);
  }

}
