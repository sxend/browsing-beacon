export interface BrowsingBeacon {
  (...args: any[]): void;
  l: number; // load timestamp
  t: any;    // created trackers
  p: any;    // loaded plugins
}
