module.exports = {
  name: 'InView',
  handler: function(element, callback) {
    element.addEventListener('click', function(event) {
      callback(event);
    });
  }
}
