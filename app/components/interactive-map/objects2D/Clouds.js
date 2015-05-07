'use strict';

import PIXI from 'pixi.js';

export default class Clouds {
  constructor(width, height) {
    let textures = [];
    let t;

    this._nbFrames = 50;

    for (let i = 0; i < this._nbFrames; i++) {
      t = PIXI.Texture.fromImage('../assets/images/transition/clouds/animNuages_000' + i + '.png');
      t.once('update', () => {
        t.width = width;
        t.height = height;
      });
      textures.push(t);
    }

    this._currentFrame = 0;
    this._frameFrom = 0;
    this._frameTo = undefined;

    this._movieclip = new PIXI.extras.MovieClip(textures);
    this._movieclip.loop = false;
    this._movieclip.width = width;
    this._movieclip.height = height;
  }

  getClip() {
    return this._movieclip;
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
}