/**
 * Created by sxend on 1/15/16.
 */

(function () {
    var Beacon = {};
    Beacon.__plugins = [];
    Beacon.register = function (plugin) {

    };
    Beacon.observe = function (queryOrEvents, specialHandler) {

    };
    function Events(args) {
        console.log("args is event tag");
    }

    Beacon.Events = Events;
})();

Beacon.configure({
    'beacon-interval': 1000, // unit is  millis.
    'plugins': [
        Beacon.require("//cdn.example.com/special-plugin.js"),
        {
            bind: function(Events){

            },
            handler: function (events) {

            }
        }
    ]
});

var myPlugin = Beacon.Plugin.extend({
    bind: Beacon.Events.Selector(".hoge"),
    handler: function(event) {

    }
});
Beacon.observe(Beacon.Evnets.Selector(".article-foo-bar"), function(event){

});
Beacon.register(myPlugin);

//
mainjsElement.onload = function () {

};
