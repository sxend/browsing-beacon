import Events from './events/index';
class Beacon {
  static configure(config) {
    this.Events = new Events(config);
  }
}
window.Beacon = Beacon;
