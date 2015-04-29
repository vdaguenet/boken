'use strict';

import PIXI from 'pixi.js';
import ThresholdAlphaFilter from '../filters/ThresholdAlphaFilter/ThresholdAlphaFilter';

export default class World extends PIXI.Container {

  constructor(width, height) {
    super();

    this.renderer = PIXI.autoDetectRenderer(width, height, {
      transparent: true
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

  transitionToExercice() {
    this.thresholdAlphaFilter.play();
  }

  zoomIn(x, y) {
    if (this._tlZoomOut) {
      this._tlZoomOut.kill();
    }

    this._zoomed = true;

    this._tlZoomIn = new TimelineMax();
    this._tlZoomIn.fromTo(this.pivot, 0.9, {x: this._oldPosition.x, y: this._oldPosition.y}, {x: x, y: y, ease: Expo.easeOut}, 0);
    this._tlZoomIn.fromTo(this.scale, 0.9, {x: this._oldScale.x, y: this._oldScale.y}, {x: 2, y: 2, ease: Expo.easeOut}, 0);
  }

  zoomOut() {
    if (!this._zoomed) return;

    if (this._tlZoomIn) {
      this._tlZoomIn.kill();
    }

    this._zoomed = false;

    this._tlZoomOut = new TimelineMax();
    this._tlZoomOut.to(this.pivot, 0.6, {x: this._oldPosition.x, y: this._oldPosition.y, ease: Expo.easeOut}, 0);
    this._tlZoomOut.to(this.scale, 0.6, {x: this._oldScale.x, y: this._oldScale.y, ease: Expo.easeOut}, 0);
  }

}
