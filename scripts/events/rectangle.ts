export default class Rectangle implements ClientRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  height: number;
  width: number;

  constructor(left: number, top: number, width: number, height: number);
  constructor(clientRect: ClientRect);
  constructor(leftOrClientRect: number | ClientRect,
    top?: number,
    width?: number,
    height?: number) {
    if (leftOrClientRect instanceof ClientRect) {
      this.left = leftOrClientRect.left;
      this.top = leftOrClientRect.top;
      this.right = leftOrClientRect.right;
      this.bottom = leftOrClientRect.bottom;
      this.height = leftOrClientRect.bottom - leftOrClientRect.top;
      this.width = leftOrClientRect.right - leftOrClientRect.left;
    } else if (typeof (leftOrClientRect) === "number") {
      this.left = <number>leftOrClientRect;
      this.top = top;
      this.width = width;
      this.height = height;
      this.right = <number>leftOrClientRect + width;
      this.bottom = top + height;
    } else {
      throw new Error("Type error. First parameter isn't suitable type.");
    }
  }

  /**
   * Calculate area.
   * @returns {number} Area. Pixels.
   */
  public getArea = (): number => {
    return (this.width * this.height);
  };

  /**
   * Get an area that overlaps with another rectangle.
   * @param another Another inspection target.
   * @returns {number} Overlapped area. Pixels.
   */
  public getIntersectingArea = (another: ClientRect): number => {
    var minRight = Math.min(this.right, another.right);
    var maxLeft = Math.max(this.left, another.left);
    var minBottom = Math.min(this.bottom, another.bottom);
    var maxTop = Math.max(this.top, another.top);
    var width = minRight - maxLeft;
    var height = minBottom - maxTop;

    if (width < 0 || height < 0) {
      // Uncrossed if minus. Protect following case.
      // e.g. width = -1, height -1, => 1 (In spite of uncrossed...)
      return 0;
    } else {
      return width * height;
    }
  };

}
