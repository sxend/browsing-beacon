import Marker from '../utils/marker';

export default function mark(key: string, value: any) {
  'use strict';
  Marker.mark(key, value);
}
