module.exports = function(internal) {
  return internal.Events.register({
    name: 'InView',
    handler: function(element, callback) {
      element.addEventListener('click', function(event) {
        callback(event);
      });
    }
  });
};
