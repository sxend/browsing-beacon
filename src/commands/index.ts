import create from './create';
import send from './send';
import watch from './watch';
import mark from './mark';
import set from './set';
import provide from './provide';
import _require from './require'; // require is reserved keyword
import remove from './remove';

export default {
  create: create,
  send: send,
  watch: watch,
  mark: mark,
  set: set,
  provide: provide,
  remove: remove,
  require: _require
}
