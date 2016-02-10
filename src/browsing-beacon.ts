export interface BrowsingBeacon {
  (...args: any[]): any;
  l: number; // load timestamp
  t: any;    // created trackers
  p: any;    // loaded plugins
}
