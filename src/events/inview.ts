// FIXME まだバグあり
import BBEvent from './bbevent.ts';
import Rectangle from './rectangle.ts';

export default class InView extends BBEvent {
  constructor(condition) {
    super(condition);
  }
  handle(element, callback) {
    try {
      var inViewManager = new InViewManager(element, callback);
      InViewInstrument.addEventListeners(inViewManager.handler);
    } catch (e) {
      callback(e);
    }
  }

}
class InViewManager {
  element: HTMLElement;
  callback: (element: HTMLElement) => void;
  timerId: number;
  inView: boolean;
  handler: (e: Event) => void;
  constructor(element: any, callback: (element: HTMLElement) => void) {
    this.element = element;
    this.callback = callback;
    this.timerId = 0;
    this.inView = false;
    this.handler = InViewInstrument.createInViewInstrumentHandler(this);
  }
}
class InViewInstrument {

  private static inViewThresholdMillis: number = 1000;

  /**
   * Get a current viewport as rectangle.
   * @param doc document
   * @returns {ProFitX.Metric.Rectangle} Rectangle of viewport.
   */
  private static getViewportRect = (doc: Document): Rectangle => {
    var l = doc.documentElement.scrollLeft || doc.body.scrollLeft;
    var t = doc.documentElement.scrollTop || doc.body.scrollTop;
    var w = doc.body.clientWidth;
    var h = doc.body.clientHeight;

    return new Rectangle(l, t, w, h);
  };

  /**
   * Start an inview timer.
   * http://www.mediaratingcouncil.org/050415_Mobile%20Viewability%20Interim%20Guidance_final.pdf
   * "Display: 50% of Pixels, One Second"
   *
   * @param inViewManager
   */
  private static startInViewTimer = (inViewManager: InViewManager): void => {
    if (!!inViewManager.timerId) {
      // timerId is not zero. Already started.
      return;
    }

    inViewManager.timerId = setTimeout(() => {
      inViewManager.timerId = 0;

      inViewManager.inView = true;
      InViewInstrument.removeEventListeners(inViewManager.handler);
      if (inViewManager.callback) {
        inViewManager.callback(inViewManager.element);
      }
    }, InViewInstrument.inViewThresholdMillis);
  };

  /**
   * Clear an inview timer.
   * If you can be determined that it is not InView, please call this method.
   * @param inViewManager
   */
  private static clearInViewTimer = (inViewManager: InViewManager): void => {
    if (inViewManager.timerId) {
      clearTimeout(inViewManager.timerId);
      inViewManager.timerId = 0;
    }
  };

  public static addEventListeners = (handler: EventListenerOrEventListenerObject): void => {
    var w = window.top;
    w.addEventListener("load", handler, false);
    w.addEventListener("resize", handler, false);
    w.addEventListener("scroll", handler, false);
  };

  private static removeEventListeners = (handler: EventListenerOrEventListenerObject): void => {
    var w = window.top;
    w.removeEventListener("load", handler);
    w.removeEventListener("resize", handler);
    w.removeEventListener("scroll", handler);
  };

  /**
   * Create an instrument for .
   * @param inViewManager Manager for InView about an advertisement.
   * @returns {function(Event): void}
   */
  public static createInViewInstrumentHandler = (inViewManager: InViewManager): ((e: Event) => void) => {
    // TODO 負荷対策実装。このまま単純にscrollイベントを拾い続けると、スクロールするたびに処理が何度も動いてしまう。
    var handler = (e: Event) => {
      if (inViewManager.inView) {
        return;
      }
      switch (e.type) {
        case "load":
        case "resize":
        case "scroll":
          var viewportRect: Rectangle = InViewInstrument.getViewportRect(window.top.document);
          var adClientRect: ClientRect = inViewManager.element.getBoundingClientRect();
          var adRect: Rectangle = new Rectangle(
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
    };
    return handler;
  };

  // !!! Entry point in InView measurement. !!!
  /**
   * Observe the element for in view.
   *
   * @param targetElement HTML element of an advertisement. e.g. div, li and iframe.
   * @param callback execute when the element "InViewed".
   */
  // public static observeInView = (targetElement: HTMLElement, callback?: (element: HTMLElement) => void): void => {
  //   if (!targetElement) {
  //     throw new Error("targetElement is empty.");
  //   }
  //
  //   var inViewManager = new InViewManager();
  //   inViewManager.element = targetElement;
  //   inViewManager.callback = callback;
  //   inViewManager.timerId = 0;
  //   inViewManager.inView = false;
  //   var handler = InViewInstrument.createInViewInstrumentHandler(inViewManager);
  //   inViewManager.handler = handler;
  //   InViewInstrument.addEventListeners(handler);
  // };
}
