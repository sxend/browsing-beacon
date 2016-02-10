import Marks from '../utils/marks';

export default function mark(args: any) {
  'use strict';
  var marks = [].concat.call(args); // {} => [{}], [{}, {}] => [{}, {}]
  marks.forEach((mark) => {
    if (!mark || mark.key === void 0 || !mark.value === void 0) {
      throw new Error('mark key or value is required.');
    }
    Marks.mark(mark);
  });
}
