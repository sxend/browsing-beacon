import BBEvent from './bbevent';
import Rectangle from './rectangle';

export default class InView extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(callback) {
    try {
      super.getElements().forEach((element) => {
        let inViewManager = new InViewManager(element, callback);
        InViewInstrument.addEventListeners(inViewManager.handler);
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
  static startInViewTimer(inViewManager) {
    if (!!inViewManager.timerId) { // timerId is not zero. Already started.
      return;
    }
    inViewManager.timerId = setTimeout(() => {
      inViewManager.timerId = 0;

      inViewManager.inView = true;
      InViewInstrument.removeEventListeners(inViewManager.handler);
      if (inViewManager.callback) {
        inViewManager.callback(inViewManager.element);
      }
    }, InViewInstrument.inViewThresholdMillis());
  }
  static clearInViewTimer(inViewManager) {
    if (inViewManager.timerId) {
      clearTimeout(inViewManager.timerId);
      inViewManager.timerId = 0;
    }
  }
  static addEventListeners(handler) {
    let w = window.top;
    w.addEventListener("load", handler, false);
    w.addEventListener("resize", handler, false);
    w.addEventListener("scroll", handler, false);
  }
  static removeEventListeners(handler) {
    let w = window.top;
    w.removeEventListener("load", handler);
    w.removeEventListener("resize", handler);
    w.removeEventListener("scroll", handler);
  }
}

class InViewManager {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;
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
