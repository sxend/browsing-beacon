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
        var envelope = {
            ext: {
                task: task
            },
            url: location.href
        };
        document.createElement('img').src = internal.endpoint + "?message=" + JSON.stringify(envelope) + "&_=" + new Date().getMilliseconds()
    }

    Beacon.send = function (task) {
        internal.tasks.push(task);
    };
    function handleEvent(e) {

        Beacon.send({
            innerText: this.innerText,
            place: {
                top: this.clientTop,
                left: this.clientLeft,
                width: this.clientWidth,
                height: this.clientHeight
            },
            type: e.type
        });
    }

    internal.events.forEach(function (event) {
        document.body.addEventListener(event, handleEvent.bind(document.body));
        [].slice.call(document.body.children).forEach(function (child) {
            child.addEventListener(event, handleEvent.bind(child));
        })
    });
    Beacon.batchStart = function () {
        setInterval(function () {
            while (internal.tasks.length > 0) {
                sendNow(internal.tasks.shift())
            }
        }, internal.batchInterval)
    };
    Beacon.batchStart();

    window.Beacon = Beacon;
})(window.Beacon || {});
Beacon.send({ext: "beacon tracking start"});
