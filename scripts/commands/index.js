import configure from './configure';
import send from './send';
export default function(bb) {
  return {
    'configure': configure(bb),
    'send': send(bb)
  }
}
