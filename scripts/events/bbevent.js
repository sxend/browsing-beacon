export default class BBEvent {
  constructor(eventDefinition, config) {
    this.querySelector = config.querySelector;
    this.handler = eventDefinition.handler;
  }
  static create(eventDefinition) {
    return function(config) {
      return new Event(eventDefinition, config);
    }
  }
}
