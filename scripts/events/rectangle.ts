import {
  isNumber
}
from '../utils/type-check';

export default class Rectangle {
  constructor(leftOrClientRect, top, width, height) {
    if (leftOrClientRect instanceof ClientRect) {
      this.left = leftOrClientRect.left;
      this.top = leftOrClientRect.top;
      this.right = leftOrClientRect.right;
      this.bottom = leftOrClientRect.bottom;
      this.height = leftOrClientRect.bottom - leftOrClientRect.top;
      this.width = leftOrClientRect.right - leftOrClientRect.left;
    } else if (isNumber(leftOrClientRect)) {
      this.left = leftOrClientRect;
      this.top = top;
      this.width = width;
      this.height = height;
      this.right = leftOrClientRect + width;
      this.bottom = top + height;
    }
  }
  getArea() {
    return (this.width * this.height);
  };
  getIntersectingArea(another) {
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
  }
}
