'use strict';

import View from 'brindille-view';
import resizeUtil from 'brindille-resize';
import PIXI from 'pixi.js';
import raf from 'raf';
import {on, off} from 'dom-event';
import World from './objects2D/World.js';
import Island from './objects2D/Island.js';
import ExercicePoint from './objects2D/ExercicePoint.js';
import Way from './objects2D/Way.js';
import * as ExerciceApi from 'services/exercice-api';

import template from './interactiveMap.html';

export default class InteractiveMap extends View {
  constructor() {
    super({
      template: template,
      resolve: {},
      model: {}
    });

    this.$overlay = this.$el.querySelector('.overlay');
    on(this.$overlay, 'touchend', this.closeSidebar.bind(this));
  }

  ready() {
    this.world = new World(resizeUtil.width, resizeUtil.height);
    resizeUtil.addListener(this.resize.bind(this));
    this.initIsland();
    this.initPleats();
    this.initExercices();
    // Append world
    this.world.appendTo(this.$el);
    raf(this.animate.bind(this));
  }

  destroying() {
    resizeUtil.removeAllListeners();
    this.island.off();
  }

  applyGreyFilter() {
    TweenMax.to(this.$overlay, 0.6, {autoAlpha: 0.35, display: 'block'});
  }

  removeGreyFilter() {
    TweenMax.to(this.$overlay, 0.6, {autoAlpha: 0, display: 'none'});
  }

  closeSidebar() {
    this.removeGreyFilter();
    this.emit('sidebar:close');
  }

  initPleats() {
    // Add pleats over the map
    var pleats = new PIXI.Sprite(PIXI.Texture.fromImage('../assets/images/map/lines.png'));
    pleats.width = this.world.getWidth();
    pleats.height = this.world.getHeight();
    pleats.anchor = new PIXI.math.Point(0.5, 0.5);
    pleats.x = 0.5 * this.world.getWidth();
    pleats.y = 0.5 * this.world.getHeight();
    this.world.addChild(pleats);
  }

  initIsland() {
    // Add main island
    this.island = new Island(0.5 * this.world.getWidth(), 0.5 * this.world.getHeight(), this.world.getWidth(), this.world.getHeight(), {
      locked: false,
      texture: PIXI.Texture.fromImage('../assets/images/map/island.png')
    });

    this.world.addChild(this.island);
  }

  initExercices() {
    let exercicePoint;
    this.way = new Way();

    for (let point of ExerciceApi.getPoints()) {
      exercicePoint = new ExercicePoint(point.x, point.y, point.exerciceId, point.logbookPageId, point.active);
      exercicePoint.on('open', this.openExercice.bind(this));
      this.way.addPoint(exercicePoint);
    }

    this.world.addChild(this.way);
    this.way.show();
  }

  openExercice(e) {
    this.emit('exercice:open', {
      exerciceId: e.exerciceId,
      logbookId: e.logbookId
    });
    this.world.transitionToExercice();
  }

  resize() {
    this.world.resize(resizeUtil.width, resizeUtil.height);
  }

  animate() {
    raf(this.animate.bind(this));
    this.world.render();
  }

  showNextExercice() {
    this.world.reverseTransitionToExercice();
  }

}