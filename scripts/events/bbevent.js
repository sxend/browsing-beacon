export default class BBEvent {
  constructor(condition) {
    this.isBBEvent = true;
    this.condition = condition;
  }
  handle(context, element, callback) {}
  getElements() {
    let elements = [].slice.call(document.querySelectorAll(this.condition.querySelector));
    if (this.condition.index) {
      return elements.slice(this.condition.index, this.condition.index + 1);
    }
    return elements;
  }
}
