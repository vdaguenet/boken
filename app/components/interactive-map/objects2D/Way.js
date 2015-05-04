'use strict';

import PIXI from 'pixi.js';

export default class Way extends PIXI.Container {
  constructor() {
    super();

    this._points = [];
  }

  addPoint(point) {
    this._points.push(point);
    point.hide();
    this.addChild(point);
  }

  show() {
    for (let point of this._points) {
      if (point.active) {
        point.show();
      }
    }
  }
}