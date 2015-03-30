'use strict';

import Island from './Island';
import PIXI from 'pixi.js';

export default class World {

  constructor(width, height) {
    this.stage = new PIXI.Stage(0xFFFFFF);
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      transparent: true
    });
    this.islands = [];
  }

  resize(width, height) {
    this.stage.addChild(obj);
  }

  render() {
    this.renderer.render(this.stage);
  }

  addIsland(island){
    this.islands.push(island);
    this.stage.addChild(island);
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}
