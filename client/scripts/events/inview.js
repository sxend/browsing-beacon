
module.exports = {
  name: 'InView',
  handler: function(element, callback) { // FIXME
    element.addEventListener('click', function(event) {
      callback(event);
    });
  }
};
