export default class BBEvent {
  public name: string;
  public condition: any;
  public isBBEvent: boolean;

  constructor(name, condition) {
    this.isBBEvent = true;
    this.condition = condition;
    this.name = name;
  }
  handle(element, callback) {}
  getElements() {
    var elements = [].slice.call(document.querySelectorAll(this.condition.querySelector));
    if (this.condition.index) {
      return elements.slice(this.condition.index, this.condition.index + 1);
    }
    return elements;
  }
}
