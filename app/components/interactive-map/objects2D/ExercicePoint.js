'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, img, url) {
    super(PIXI.Texture.fromImage(img));

    this.x = x;
    this.y = y;
    this.url = url;
    this.interactive = true;
    this.anchor = new PIXI.Point(0.5, 0.5);
    this.scale = new PIXI.Point(0.25, 0.25);
  }

  click(e) {
    e.stopped = true;
  }

  tap(e) {
    e.stopped = true;
  }

}
