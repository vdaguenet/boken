'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';
import RandomHelper from 'random-helper';

const randomUtil = new RandomHelper();

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, texture, url) {
    super(texture);

    this.x = x;
    this.y = y;
    this.url = url;
    this.interactive = true;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
    var s = randomUtil.randomFloat(0.25, 0.5, 2);
    this.scale = new PIXI.math.Point(s, s);
  }

  click(e) {
    e.stopped = true;
    this.open();
  }

  tap(e) {
    e.stopped = true;
    this.open();
  }

  open() {
    if(!this.url) return;

    TweenMax.to(this.scale, 0.6, {x: 100, y: 100, ease: Expo.easeOut,
      onComplete: e => {
      }
    });
  }

}
