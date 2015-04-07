'use strict';

import PIXI from 'pixi.js';
import clone from 'clone';

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
    this.texture.once('update', e => {
      this._ratio = e.target.width / e.target.height;
      this.resize(width, height);
    });
    this.interactive = true;
    (opt.locked === true) ? this.locked = opt.locked : this.locked = false;
    this._isOpen = false;
  }

  resize(width, height) {
    this.width = this._ratio * height;
    this.height = height;
  }

  click(e) {
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
    this._originalScale = this.scale.clone();
    TweenMax.killTweensOf(this.scale);
    TweenMax.to(this.scale, 0.6, {x: 1, y: 1, ease: Expo.easeOut});
    this._isOpen = true;
  }

  close() {
    if(!this._originalScale) return;

    TweenMax.killTweensOf(this.scale);
    TweenMax.to(this.scale, 0.3, {x: this._originalScale.x, y: this._originalScale.y, ease: Expo.easeOut});
    this._isOpen = false;
  }

}