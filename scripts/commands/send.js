
import Emitter from '../emitter';

export default function(bb, args) {
  let emitter = new Emitter(bb);
  if ('string' === typeof args[0]) {
    emitter.emit(args[0]);
  }
  // TODO impl
}
