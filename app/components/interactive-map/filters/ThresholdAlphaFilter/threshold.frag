precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform sampler2D uAlphaMask;
uniform sampler2D uSamplerDest;
uniform float uThreshold;

void main(void)
{
  vec4 mask = texture2D(uAlphaMask, vTextureCoord);
  float colorSum = mask.x + mask.y + mask.z;

  gl_FragColor = texture2D(uSampler, vTextureCoord);

  if (colorSum >= uThreshold) {
    gl_FragColor = texture2D(uSamplerDest, vTextureCoord);
    // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // black is temporary
  }

}