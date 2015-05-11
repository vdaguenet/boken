'use strict';

import View from 'brindille-view';
import resizeUtil from 'brindille-resize';
import PIXI from 'pixi.js';
import raf from 'raf';
import {on, off} from 'dom-event';
import World from './objects2D/World';
import Island from './objects2D/Island';
import ExercicePoint from './objects2D/ExercicePoint';
import Way from './objects2D/Way';
import Clouds from './objects2D/Clouds';
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
    this.lastPoint = undefined;
    this.world = new World(resizeUtil.width, resizeUtil.height);
    this.clouds = new Clouds(resizeUtil.width, resizeUtil.height);
    resizeUtil.addListener(this.resize.bind(this));
    this.initIsland();
    this.initPleats();
    this.initExercices();
    this.world.addChild(this.clouds.getClip());
    // Append world
    this.world.appendTo(this.$el);
    raf(this.animate.bind(this));

    // FOR TEST ONLY
    setTimeout(() => {
      this.transitionIn();
    }, 1000);
  }

  transitionIn() {
    let tl = new TimelineMax();
    tl.call(() => {
      this.clouds.play();
      this.world.zoomTo(455, 310);
    }, null, null, 0);
    tl.call(() => {
      this.way.showPoints();
      this.way.playTo(this.lastPoint.frame);
    }, null, null, 1.2);
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
    let points = ExerciceApi.getPoints();
    let exercicePoint;
    let count = 0;

    this.way = new Way();

    for (let point of points) {
      exercicePoint = new ExercicePoint(point.x, point.y, point.exerciceId, point.logbookPageId, point.active, point.complete);
      exercicePoint.on('open', this.openExercice.bind(this));
      this.way.addPoint(exercicePoint);

      if (point.complete) {
        count++;
      }
    }

    this.lastPoint = points[count];
    this.world.addChild(this.way);
  }

  openExercice(e) {
    this.world.transitionToExercice(() => {
      this.emit('exercice:open', {
        exerciceId: e.exerciceId,
        logbookId: e.logbookId
      });
    });
  }

  resize() {
    this.world.resize(resizeUtil.width, resizeUtil.height);
  }

  animate() {
    raf(this.animate.bind(this));
    this.clouds.update();
    this.way.update();
    this.world.render();
  }

  showNextExercice() {
    let points = ExerciceApi.getPoints();
    let oldLastPoint = this.lastPoint;
    let count = 0;

    for (let point of points) {
      if (point.complete) {
        count++;
      }
    }

    this.lastPoint = points[count];
    this.world.reverseTransitionToExercice(() => {
      if (!oldLastPoint.complete) return;

      if (oldLastPoint.logbookPageId > -1) {
        this.emit('chapter:new');
      }

      if (!this.lastPoint) return;

      this.lastPoint.active = true;
      this.way.playFromTo(oldLastPoint.frame, this.lastPoint.frame);
      this.way.showNextPoint();
    });
  }
}