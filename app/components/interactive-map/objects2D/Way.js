'use strict';

import PIXI from 'pixi.js';

export default class Way extends PIXI.Container {
  constructor() {
    super();

    this._points = [];
    this._pathes = [];

    this._graphics = new PIXI.Graphics();
    this._graphics.lineStyle(4, 0x000000, 1);

    this.drawPath(
      614.19, 483.48,
      561.88, 493.63,
      501.38, 492.13,
      490.33, 477.33
    );

    this.addPathes();
  }

  drawPath(x0, y0, cx1, cy1, cx2, cy2, x1, y1) {
    this._graphics.moveTo(x0, y0);
    this._graphics.bezierCurveTo(cx1, cy1, cx2, cy2, x1, x1);
    this._graphics.endFill();
    let t = this._graphics.generateTexture();
    let s = new PIXI.Sprite(t);

    this._pathes.push(s);
  }

  addPathes() {
    for (let path of this._pathes) {
      path.scale.set(0, 1);
      this.addChild(path);
    }
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