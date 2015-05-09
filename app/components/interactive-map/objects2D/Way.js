'use strict';

import PIXI from 'pixi.js';

export default class Way extends PIXI.Container {
  constructor() {
    super();

    this._points = [];
    this._nbFrames = 50;
    this._currentFrame = 0;
    this._frameFrom = 0;
    this._frameTo = undefined;
    this.initPath();
  }

  initPath() {
    let textures = [];
    let t;

    for (let i = 0; i < this._nbFrames; i++) {
      t = PIXI.Texture.fromImage('../assets/images/transition/way/chemin000' + i + '.png');
      textures.push(t);
    }

    this._movieclip = new PIXI.extras.MovieClip(textures);
    this._movieclip.loop = false;
    this._movieclip.scale.set(0.916, 0.916);

    this.addChild(this._movieclip);
  }

  play() {
    this._frameTo = undefined;
    this._movieclip.play();
  }

  playTo(frameId) {
    this._frameTo = frameId;
    this._movieclip.play();
  }

  playFromTo(frameFrom, frameTo) {
    this._frameFrom = frameFrom;
    this._currentFrame = frameFrom;
    this._frameTo = frameTo;
    this._movieclip.gotoAndPlay(this._frameFrom);
  }

  update() {
    this._currentFrame = Math.floor(this._movieclip._currentTime) % this._nbFrames;

    if (this._frameTo && this._currentFrame >= this._frameTo) {
      this._movieclip.stop();
    }
  }

  addPoint(point) {
    this._points.push(point);
    point.hide();
    this.addChild(point);
  }

  showPoints() {
    for (let point of this._points) {
      if (point.active) {
        point.show();
      }
    }
  }
}