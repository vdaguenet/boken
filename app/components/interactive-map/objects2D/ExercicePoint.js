'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';
import RandomHelper from 'random-helper';

const randomUtil = new RandomHelper();

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, texture, exerciceId) {
    Emitter(this);
    super(texture);

    this.x = x;
    this.y = y;
    this.exerciceId = exerciceId;
    this.interactive = true;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
    var s = randomUtil.randomFloat(0.25, 0.5, 2);
    this.scale = new PIXI.math.Point(s, s);
    this.isOpen = false;
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
    if(!this.exerciceId) return;

    this.isOpen = true;
    this.emit('exercice:open', {id: this.exerciceId});
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
  }

}
