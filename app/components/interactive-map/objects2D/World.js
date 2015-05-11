'use strict';

import PIXI from 'pixi.js';
import clone from 'clone';
import ThresholdAlphaFilter from '../filters/ThresholdAlphaFilter/ThresholdAlphaFilter';

export default class World extends PIXI.Container {

  constructor(width, height) {
    super();

    this.renderer = PIXI.autoDetectRenderer(width, height, {
      transparent: true,
      resolution: 1
    });
    this.resize(width, height);
    this._zoomed = false;

    this.thresholdAlphaFilter = new ThresholdAlphaFilter();
    this.filters = [this.thresholdAlphaFilter];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.pivot = {
      x: 0.5 * width,
      y: 0.5 * height
    };
    this._oldPosition = {};
    this._oldPosition.x = this.x = 0.5 * width;
    this._oldPosition.y = this.y = 0.5 * height;
    this._oldScale = this.scale.clone();

    this.renderer.resize(width, height);
  }

  render() {
    this.renderer.render(this);
  }

  getWidth() {
    return this.renderer.width;
  }

  getHeight() {
    return this.renderer.height;
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }

  transitionToExercice(oncomplete) {
    this.thresholdAlphaFilter.play(oncomplete);
  }

  reverseTransitionToExercice(oncomplete) {
    this.thresholdAlphaFilter.reverse(oncomplete);
  }

  zoomTo(x, y) {
    this._tlZoomIn = new TimelineMax();
    this._tlZoomIn.fromTo(this.pivot, 3.0, {x: this._oldPosition.x, y: this._oldPosition.y}, {x: x, y: y, ease: Expo.easeInOut}, 0);
    this._tlZoomIn.fromTo(this.scale, 3.0, {x: this._oldScale.x, y: this._oldScale.y}, {x: 2, y: 2, ease: Expo.easeInOut}, 0);
  }
}
