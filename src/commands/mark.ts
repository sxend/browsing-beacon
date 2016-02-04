import Marks from '../utils/marks';

export default function mark(option: any) {
  'use strict';
  if (!option || !option.key || !option.value) {
    throw new Error('mark key or value is required.');
  }
  Marks.mark(option);
}
