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

  addIsland(module){
    var i = new Island(module.island.x, module.island.y, module.island.width, module.island.height, {
      locked: module.locked,
      image: module.island.image
    });
    this.islands.push(i);
    this.stage.addChild(i);
  }

  addIslands(islands) {
    for (var i = 0, l = islands.length; i < l; i++) {
      this.addIsland(islands[i]);
    }
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}
