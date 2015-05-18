'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';

export default class ExercicePoint extends PIXI.Sprite {

  constructor(x, y, exerciceId, logbookId, active, complete) {
    Emitter(this);

    let res = this._setNameAndScale(logbookId, complete);

    super(PIXI.Texture.fromImage('../assets/images/pictos/way/'+ res.name +'.png'));

    this.x = x;
    this.y = y;
    this.exerciceId = exerciceId;
    this.logbookId = logbookId;
    this.active = active;
    this.interactive = true;
    this.anchor = new PIXI.math.Point(0.5, 0.5);
    this.scale.set(res.scale, res.scale);
    this.isOpen = false;
    this.complete = complete;
  }

  _setNameAndScale(logbookId, complete) {
    let name = '';
    let scale = 0.5;

    if (logbookId > -1) {
      name = 'redac';
    } else {
      name = 'ex';
    }

    if (complete) {
      name += '_done';

      if (logbookId === -1) {
        scale = 0.3;
      } else {
        scale = 0.4;
      }
    }

    return {
      name: name,
      scale: scale
    };
  }

  setComplete() {
    let res = this._setNameAndScale(this.logbookId, true);
    this.complete = true;
    this.texture = PIXI.Texture.fromImage('../assets/images/pictos/way/'+ res.name +'.png');
    this.scale.set(res.scale, res.scale);
  }

  click(e) {
    if (this.complete) return;

    e.stopped = true;
    this.open();
  }

  tap(e) {
    if (this.complete) return;

    e.stopped = true;
    this.open();
  }

  show(delayFactor) {
    TweenMax.to(this, 0.6, {alpha: 1, ease: Expo.easeInOut, delay: 0.07 * delayFactor});
  }

  hide() {
    this.alpha = 0;
  }

  open() {
    this.isOpen = true;
    this.emit('open', {
      exerciceId: this.exerciceId,
      logbookId: this.logbookId,
      target: this
    });
  }
}
