'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import PIXI from 'pixi.js';
import World from './objects2D/World.js';
import Island from './objects2D/Island.js';
import ExercicePoint from './objects2D/ExercicePoint.js';
import ExercicesContainer from './objects2D/ExercicesContainer.js';
// TODO: change the following by the data from DB
import points from 'data/points.json'

export default class InteractiveMap extends View {
  constructor() {
    super({
      template: require('./interactiveMap.html'),
      resolve: {
        mapAssets: preloader.load([
          { id: 'background', src: '../assets/images/map/ocean.jpg' },
          { id: 'main', src: '../assets/images/map/island.png' },
          { id: 'pleats', src: '../assets/images/map/lines.png' },
          { id: 'point', src: '../assets/images/map/point.png' }
        ]).getPromise(),
        exercices: points
      },
      model: {}
    });
  }

  ready() {
    this.world = new World(this.$el.clientWidth, this.$el.clientHeight);
    resizeUtil.addListener(this.resize.bind(this));
  }

  destroying() {
    resizeUtil.removeAllListeners();
    this.island.off();
  }

  resolved() {
    for(var asset in this.resolvedData.mapAssets) {
      PIXI.Texture.addTextureToCache(new PIXI.Texture(new PIXI.BaseTexture(this.resolvedData.mapAssets[asset])), asset);
    }

    this.initIsland();
    this.initPleats();
    this.initExercices();
    // Append world
    this.world.appendTo(this.$el);
    this.animate();
  }

  initPleats() {
    // Add pleats over the map
    var pleats = new PIXI.Sprite(PIXI.utils.TextureCache['pleats']);
    pleats.width = this.world.getWidth();
    pleats.height = this.world.getHeight();
    pleats.anchor = new PIXI.Point(0.5, 0.5);
    pleats.x = 0.5 * this.world.getWidth();
    pleats.y = 0.5 * this.world.getHeight();
    this.world.addChild(pleats);
  }

  initIsland() {
    // Add main island
    this.island = new Island(0.5 * this.world.getWidth(), 0.5 * this.world.getHeight(), this.world.getWidth(), this.world.getHeight(), {
      locked: false,
      texture: PIXI.utils.TextureCache['main']
    });
    this.island.on('zoom', coord => {
      this.world.zoomIn(coord.x, coord.y);
    });
    this.island.on('unzoom', coord => {
      this.world.zoomOut();
    });

    this.world.addChild(this.island);
  }

  initExercices() {
    var exercicePoint;
    var exercicesContainer = new ExercicesContainer(this.world.getWidth(), this.world.getHeight());
    exercicesContainer.setPosition(0, 0);

    for(var ex of this.resolvedData.exercices) {
      exercicePoint = new ExercicePoint(ex.x * this.world.getWidth(), ex.y * this.world.getHeight(), PIXI.utils.TextureCache['point'], '/exercice/2');
      exercicesContainer.addExercice(exercicePoint);
    }

    this.world.addChild(exercicesContainer);
  }

  resize() {
    this.world.resize(this.$el.clientWidth, this.$el.clientHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.world.render();
  }
}