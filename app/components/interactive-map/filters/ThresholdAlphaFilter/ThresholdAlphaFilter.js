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

  play() {
    TweenMax.to(this.uniforms.uThreshold, 1.5, {value: 0, ease: Linear.easeNone});
  }

  reverse() {
    TweenMax.to(this.uniforms.uThreshold, 1.5, {value: 3.0, ease: Linear.easeNone});
  }

  setDestinationImage(path) {
    this.destTexture = PIXI.Texture.fromImage(path);
    this.uniforms.uSamplerDest.value = this.destTexture;
  }
}
