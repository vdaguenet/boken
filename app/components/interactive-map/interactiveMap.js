'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import World from './objects2D/World.js';
import Island from './objects2D/Island.js';

export default class InteractiveMap extends View {
  constructor() {
    super({
      template: require('./interactiveMap.html'),
      resolve: {
        islands: preloader.load([
          { id: 'background', src: '../assets/images/map/ocean.jpg' },
          { id: 'main', src: '../assets/images/map/island.png' }
        ]).getPromise()
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
  }

  resolved() {
    var x = 0.5 * this.world.getWidth();
    var y = 0.5 * this.world.getHeight();
    var i = new Island(x, y, this.world.getWidth(), this.world.getHeight(), {
      locked: false,
      image: this.resolvedData.islands['main'].src
    });
    this.world.addChild(i);
    this.world.appendTo(this.$el);
    this.animate();
  }

  resize() {
    this.world.resize(this.$el.clientWidth, this.$el.clientHeight);
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.world.render();
  }
}