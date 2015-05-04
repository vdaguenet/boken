'use strict';

import PIXI from 'pixi.js';
import clone from 'clone';
import Emitter from 'component-emitter';

export default class Island extends PIXI.Sprite {

  constructor(x, y, width, height, opt = {}) {
    Emitter(this);
    super(opt.texture);

    opt.texture.once('update', () => {
      this._ratio = opt.texture.width / opt.texture.height;
      this.resize(width, height);
    });

    this.x = x;
    this.y = y;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
    this.interactive = true;
    (opt.locked === true) ? this.locked = opt.locked : this.locked = false;
    this._isOpen = false;
  }

  resize(width, height) {
    this.width = this._ratio * height;
    this.height = height;
  }

  click(e) {
    this.toggleOpen(e.data.originalEvent.clientX, e.data.originalEvent.clientY);
  }

  tap(e) {
    this.toggleOpen(e.data.originalEvent.changedTouches[0].clientX, e.data.originalEvent.changedTouches[0].clientY);
  }

  toggleOpen(x, y) {
    if (this.locked) return;

    if (this._isOpen) {
      this.emit('unzoom');
      this._isOpen = false;
    } else {
      this.emit('zoom', {x: x, y: y});
      this._isOpen = true;
    }
  }

}