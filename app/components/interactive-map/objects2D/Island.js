'use strict';

import PIXI from 'pixi.js';

export default class Island extends PIXI.Sprite {

  constructor(x, y, width, height, opt = {}) {
    if(opt.image) {
      super(PIXI.Texture.fromImage(opt.image));
    } else {
      super()
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.interactive = true;
    this.locked = opt.locked || true;
    this._imagePath = opt.image;
    this._isOpen = false;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

}