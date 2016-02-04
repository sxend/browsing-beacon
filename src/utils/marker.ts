import Cookies from './cookies';

export default class Marker {

  static mark(key: string, value: any): void {
    Cookies.setItem(this.makeMarkerKey(key), value);
  }
  static find(key: string): any {
    return Cookies.getItem(this.makeMarkerKey(key));
  }
  static remove(key): void {
    Cookies.removeItem(key);
  }
  private static makeMarkerKey(key: string): string {
    return `marker:${key}`;
  }
}
