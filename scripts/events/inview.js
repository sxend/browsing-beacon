import BBEvent from './bbevent';
import Rectangle from './rectangle';

export default class InView extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  watch(callback) {

    try {
      super.getElements().forEach(function(element) {
        let inViewManager = new InViewManager(element, callback);
        element.addEventListener('mouseover', function(ev) {
          callback(null, ev);
        });
      });
    } catch (e) {
      callback(e);
    }
  }
}

class InViewInstrument {
  static inViewThresholdMillis() {
    return 1000;
  };
  static getViewportRect(doc) {
    let l = doc.documentElement.scrollLeft || doc.body.scrollLeft;
    let t = doc.documentElement.scrollTop || doc.body.scrollTop;
    let w = doc.body.clientWidth;
    let h = doc.body.clientHeight;

    return new Rectangle(l, t, w, h);
  };
}

class InViewManager {
  constructor(element, callback, handler) {
    this.element = element;
    this.callabck = callback;
    this.handler = createInViewInstrumentHandler(this);
    this.inView = false;
    this.timerId = 0;
  }
}

function createInViewInstrumentHandler(inViewManager) {
  return function(e) {
    if (inViewManager.inView) {
      return;
    }
    switch (e.type) {
      case "load":
      case "resize":
      case "scroll":
        let viewportRect = InViewInstrument.getViewportRect(window.top.document);
        let adClientRect = inViewManager.element.getBoundingClientRect();
        let adRect = new Rectangle(
          adClientRect.left + window.scrollX,
          adClientRect.top + window.scrollY,
          adClientRect.width,
          adClientRect.height);

        // 重なっている時のみ計算
        // 交差している面積が広告の50%以上あるか
        if (viewportRect.getIntersectingArea(adRect) / adRect.getArea() >= 0.5) {
          InViewInstrument.startInViewTimer(inViewManager);
        } else {
          InViewInstrument.clearInViewTimer(inViewManager);
        }
        break;
    }
  }
}
