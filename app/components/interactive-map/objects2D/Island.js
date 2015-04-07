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
      // Save attributes for animations
      this._oldPosition = this.position.clone();
      this._oldScale = this.scale.clone();
    });
    this.anchor = new PIXI.Point(0.5, 0.5);
    this.interactive = true;
    (opt.locked === true) ? this.locked = opt.locked : this.locked = false;
    this._isOpen = false;

  }

  resize(width, height) {
    this.width = this._ratio * height;
    this.height = height;
  }

  click(e) {
    this.toggleOpen(e.originalEvent.clientX, e.originalEvent.clientY);
  }

  tap(e) {
    this.toggleOpen(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
  }

  toggleOpen(x, y) {
    if (this.locked) return;

    if(this._isOpen) {
      this.close();
    } else {
      var target = {
        x: this._oldPosition.x - x + this._oldPosition.x,
        y: this._oldPosition.y - y + this._oldPosition.y,
      };
      this.open(target);
    }
  }

  open(target) {
    if (this._tlClose) {
      this._tlClose.kill();
    }

    this._isOpen = true;

    this._tlOpen = new TimelineMax();
    this._tlOpen.fromTo(this, 0.9, {x: this._oldPosition.x, y: this._oldPosition.y}, {x: target.x, y: target.y, ease: Expo.easeOut}, 0);
    this._tlOpen.fromTo(this.scale, 0.9, {x: this._oldScale.x, y: this._oldScale.y}, {x: 2, y: 2, ease: Expo.easeOut}, 0);
  }

  close() {
    if(!this._isOpen) return;

    if (this._tlOpen) {
      this._tlOpen.kill();
    }

    this._isOpen = false;

    this._tlClose = new TimelineMax();
    this._tlClose.to(this, 0.6, {x: this._oldPosition.x, y: this._oldPosition.y, ease: Expo.easeOut}, 0);
    this._tlClose.to(this.scale, 0.6, {x: this._oldScale.x, y: this._oldScale.y, ease: Expo.easeOut}, 0);
  }

}