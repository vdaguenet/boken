'use strict';

import Island from './Island';
import PIXI from 'pixi.js';

import points from 'data/points.json'

export default class World {

  constructor(width, height) {
    this.stage = new PIXI.Stage(0xFFFFFF);
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      transparent: true
    });
    this.renderer.resize(width, height);
  }

  resize(width, height) {
    for(var child of this.stage.children) {
      if(child.resize && typeof child.resize === 'function') {
        child.resize(this.renderer.width, this.renderer.height);
      }
    }

    this.renderer.resize(width, height);
  }

  render() {
    this.renderer.render(this.stage);
  }

  getWidth() {
    return this.renderer.width;
  }

  getHeight() {
    return this.renderer.height;
  }

  addChild(child){
    this.stage.addChild(child);
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}
