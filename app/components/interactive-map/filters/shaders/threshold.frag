precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vColorSum;

uniform sampler2D uSampler;
uniform float uThreshold;

void main(void)
{
  gl_FragColor = texture2D(uSampler, vTextureCoord);

  if (vColorSum > uThreshold) {
    gl_FragColor.a = 0.0;
  }
}