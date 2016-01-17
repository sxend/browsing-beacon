/**
 * Created by sxend on 1/15/16.
 */

(function (Beacon) {
    var internal = {
        endpoint: "http://localhost:9000/beacon",
        events: [
            "abort",
            "afterprint",
            "animationend",
            "animationiteration",
            "animationstart",
            "audioprocess",
            "audioend",
            "audiostart",
            "beforeprint",
            "beforeunload",
            "beginEvent",
            "blocked",
            "blur",
            "boundary",
            "cached",
            "canplay",
            "canplaythrough",
            "change",
            "chargingchange",
            "chargingtimechange",
            "checking",
            "click",
            "close",
            "2complete",
            "compositionend",
            "compositionstart",
            "compositionupdate",
            "contextmenu",
            "copy",
            "cut",
            "dblclick",
            "devicelight",
            "devicemotion",
            "deviceorientation",
            "deviceproximity",
            "dischargingtimechange",
            "DOMActivate",
            "DOMAttributeNameChanged",
            "DOMAttrModified",
            "DOMCharacterDataModified",
            "DOMContentLoaded",
            "DOMElementNameChanged",
            "DOMFocusIn  Unimplemented",
            "DOMFocusOut  Unimplemented",
            "DOMNodeInserted",
            "DOMNodeInsertedIntoDocument",
            "DOMNodeRemoved",
            "DOMNodeRemovedFromDocument",
            "DOMSubtreeModified",
            "downloading",
            "drag",
            "dragend",
            "dragenter",
            "dragleave",
            "dragover",
            "dragstart",
            "drop",
            "durationchange",
            "emptied",
            "2end",
            "2ended",
            "endEvent",
            "8error",
            "focus",
            "focusinUnimplemented",
            "focusoutUnimplemented",
            "fullscreenchange",
            "fullscreenerror",
            "gamepadconnected",
            "gamepaddisconnected",
            "gotpointercapture",
            "hashchange",
            "lostpointercapture",
            "input",
            "invalid",
            "keydown",
            "keypress",
            "keyup",
            "languagechange",
            "levelchange",
            "2load",
            "loadeddata",
            "loadedmetadata",
            "loadend",
            "loadstart",
            "mark",
            "5message",
            "mousedown",
            "mouseenter",
            "mouseleave",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "nomatch",
            "notificationclick",
            "noupdate",
            "obsolete",
            "offline",
            "online",
            "2open",
            "orientationchange",
            "pagehide",
            "pageshow",
            "paste",
            "2pause",
            "pointercancel",
            "pointerdown",
            "pointerenter",
            "pointerleave",
            "pointerlockchange",
            "pointerlockerror",
            "pointermove",
            "pointerout",
            "pointerover",
            "pointerup",
            "play",
            "playing",
            "popstate",
            "2progress",
            "push",
            "pushsubscriptionchange",
            "ratechange",
            "readystatechange",
            "repeatEvent",
            "reset",
            "resize",
            "resourcetimingbufferfull",
            "result",
            "resume",
            "scroll",
            "seeked",
            "seeking",
            "select",
            "selectstart",
            "selectionchange",
            "show",
            "soundend",
            "soundstart",
            "speechend",
            "speechstart",
            "stalled",
            "2start",
            "storage",
            "submit",
            "success",
            "suspend",
            "SVGAbort",
            "SVGError",
            "SVGLoad",
            "SVGResize",
            "SVGScroll",
            "SVGUnload",
            "SVGZoom",
            "timeout",
            "timeupdate",
            "touchcancel",
            "touchend",
            "touchenter",
            "touchleave",
            "touchmove",
            "touchstart",
            "transitionend",
            "unload",
            "updateready",
            "upgradeneeded",
            "userproximity",
            "voiceschanged",
            "versionchange",
            "visibilitychange",
            "volumechange",
            "waiting",
            //"wheel"
        ],
        tasks: [],
        batchInterval: 1000
    };

    function sendNow(task) {
        var parser = document.createElement('a');
        parser.href = location.href;
        var envelope = {
            ext: {
                task: task
            },
            url: {
                protocol: parser.protocol,
                hostname: parser.hostname,
                port: parser.port,
                pathname: parser.pathname,
                search: parser.search,
                hash: parser.hash
            }
        };
        document.createElement('img').src = internal.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getMilliseconds()
    }

    Beacon.send = function (task) {
        internal.tasks.push(task);
    };
    function handleEvent(e) {
        var dom = this.getBoundingClientRect();
        var place = {
            top: dom.top,
            left: dom.left,
            bottom: dom.bottom,
            right: dom.right,
            width: dom.width,
            height: dom.height
        };
        console.log(place);
        Beacon.send({
            classList: this.classList,
            id: this.id,
            place: place,
            type: e.type
        });
    }

    internal.events.forEach(function (event) {
        var dom = document.body.querySelectorAll('*');
        [].slice.call(dom).forEach(function (child) {
            child.addEventListener(event, handleEvent.bind(child));
        });
    });
    Beacon.batchStart = function () {
        setInterval(function () {
            while (internal.tasks.length > 0) {
                sendNow(internal.tasks.shift())
            }
        }, internal.batchInterval)
    };
    Beacon.batchStart();

    function wrapViewPort(){
      var width = window.screen.width;
      var height = window.screen.height;
      var wrapper = document.createElement('div');
      wrapper.style.position = "absolute";
      wrapper.style.top = 0;
      setInterval(function(){
        wrapper.style.bottom = document.body.getBoundingClientRect().top + "px";
      }, 1);
      wrapper.style.left = 0;
      wrapper.style.width = width + "px";
      wrapper.style.height = height + "px";
      wrapper.style.zIndex = 100;
      internal.events.forEach(function (event) {
        wrapper.addEventListener(event, function(e){
          console.log("wrapper event: ", e);
        });
      });
      document.body.appendChild(wrapper);
      console.log(wrapper);
      window.wrapper = wrapper;
    }
    wrapViewPort();

    window.Beacon = Beacon;
})(window.Beacon || {});
Beacon.send({ext: "beacon tracking start"});
