'use strict';

// import causes errors
// see https://github.com/stackgl/glslify/issues/49
const glslify = require('glslify');

import PIXI from 'pixi.js';

const fragmentShader = glslify('./threshold.frag');

export default class ThresholdAlphaFilter extends PIXI.AbstractFilter {
  constructor() {
    let mask = PIXI.Texture.fromImage('../assets/images/transition/test25.jpg');
    this.destTexture = PIXI.Texture.fromImage('../assets/images/map/bg-exercice.jpg');

    super(null, fragmentShader, {
      uAlphaMask: {type: 'sampler2D', value: mask},
      uSamplerDest: {type: 'sampler2D', value: this.destTexture},
      uThreshold: {type: 'f', value: 3.0} // 0: nothing masked, 3.0: everything masked
    });
  }

  play(callback) {
    TweenMax.to(this.uniforms.uThreshold, 1.5, {value: 0, ease: Linear.easeNone, onComplete: callback});
  }

  reverse(callback) {
    TweenMax.to(this.uniforms.uThreshold, 1.5, {value: 3.0, ease: Linear.easeNone, onComplete: callback});
  }

  setDestinationImage(path) {
    this.destTexture = PIXI.Texture.fromImage(path);
    this.uniforms.uSamplerDest.value = this.destTexture;
  }
}
