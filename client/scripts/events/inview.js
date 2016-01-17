module.exports = {
  name: 'InView',
  handler: function(element, context, callback) {
    element.addEventListener('click', function(event) {
      callback();
    });
  }
}
