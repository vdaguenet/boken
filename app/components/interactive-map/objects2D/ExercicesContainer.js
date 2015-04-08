'use strict';

import PIXI from 'pixi.js';
import Emitter from 'component-emitter';

export default class ExercicesContainer extends PIXI.Container {

  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.anchor = new PIXI.Point(0.5, 0.5);
    this.exercices = [];
  }

  addExercice(exercice) {
    this.exercices.push(exercice);
    this.addChild(exercice);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

}
