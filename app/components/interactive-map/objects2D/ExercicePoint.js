'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';
import RandomHelper from 'random-helper';

const randomUtil = new RandomHelper();

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, exerciceId, logbookId, active) {
    Emitter(this);
    super(PIXI.Texture.fromImage('../assets/images/map/point.png'));

    this.x = x;
    this.y = y;
    this.exerciceId = exerciceId;
    this.logbookId = logbookId;
    this.active = active;
    this.interactive = true;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
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

  show() {
    TweenMax.to(this, 0.6, {alpha: 1, ease: Expo.easeInOut});
  }

  hide() {
    this.alpha = 0;
  }

  open() {
    this.isOpen = true;
    this.emit('open', {
      exerciceId: this.exerciceId,
      logbookId: this.logbookId
    });
  }
}
