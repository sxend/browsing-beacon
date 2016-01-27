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
    let minRight = Math.min(this.right, another.right);
    let maxLeft = Math.max(this.left, another.left);
    let minBottom = Math.min(this.bottom, another.bottom);
    let maxTop = Math.max(this.top, another.top);
    let width = minRight - maxLeft;
    let height = minBottom - maxTop;

    if (width < 0 || height < 0) {
      // Uncrossed if minus. Protect following case.
      // e.g. width = -1, height -1, => 1 (In spite of uncrossed...)
      return 0;
    } else {
      return width * height;
    }
  }
}
