
module.exports = {
  name: 'InView',
  handler: function(element, callback) { // FIXME
    element.addEventListener('click', function(event) {
      callback(event);
    });
  }
};
import BBEvent from './bbevent';
export default class InView extends BBEvent {
  constructor(querySelector, context) {
    super(querySelector, context);
    this.querySelector = querySelector;
  }
  listen(element, context) {
    let event = this;
    element.addEventListener('click', function(domEvent) {

    });
    element.addEventListener('mouseover', function(domEvent){

    });
  }
}
