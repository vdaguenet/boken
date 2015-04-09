'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';
import RandomHelper from 'random-helper';

const randomUtil = new RandomHelper();

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, texture, exerciceId, active) {
    Emitter(this);
    super(texture);

    this.x = x;
    this.y = y;
    this.exerciceId = exerciceId;
    this.active = active;
    this.interactive = true;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
    var s = randomUtil.randomFloat(0.25, 0.5, 2);
    this.scale = new PIXI.math.Point(s, s);
    this.isOpen = false;

    if(!this.active) this.hide();
  }

  click(e) {
    e.stopped = true;
    this.open();
  }

  tap(e) {
    e.stopped = true;
    this.open();
  }

  show() {
    TweenMax.to(this, 0.6, {alpha: 1, ease: Expo.easeInOut});
  }

  hide() {
    this.alpha = 0;
  }

  open() {
    if(!this.exerciceId) return;

    this.isOpen = true;
    this.emit('exercice:open', {id: this.exerciceId});
  }
}
