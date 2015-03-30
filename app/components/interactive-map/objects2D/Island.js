'use strict';

import PIXI from 'pixi.js';

export default class Island extends PIXI.Sprite {

  constructor(x, y, width, height, opt = {}) {
    if (opt.image) {
      super(PIXI.Texture.fromImage(opt.image));
      this._imagePath = opt.image;
    } else {
      super();
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.interactive = true;
    (opt.locked === true) ? this.locked = opt.locked : this.locked = false;
    this._isOpen = false;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  click(e) {
    console.log('click');
    this.toggleOpen();
  }

  tap(e) {
    this.toggleOpen();
  }

  toggleOpen() {
    if (this.locked) return;

    if(this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    TweenMax.killTweensOf(this.scale);
    TweenMax.to(this.scale, 0.6, {x: 1, y: 1, ease: Expo.easeOut});
    this._isOpen = true;
  }

  close() {
    TweenMax.killTweensOf(this.scale);
    TweenMax.to(this.scale, 0.3, {x: 0.5, y: 0.5, ease: Expo.easeOut});
    this._isOpen = false;
  }

}