'use strict';

// import causes errors
// see https://github.com/stackgl/glslify/issues/49
const glslify = require('glslify');

import PIXI from 'pixi.js';

const vertexShader = glslify('./shaders/threshold.vert');
const fragmentShader = glslify('./shaders/threshold.frag');

export default class ThresholdAlphaFilter extends PIXI.AbstractFilter {
  constructor() {
    super();

    console.log(vertexShader);
  }

  apply() {

  }
}