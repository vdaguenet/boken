'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import World from './objects2D/World.js';
import Island from './objects2D/Island.js';

export default class InteractiveMap extends View {
  constructor() {
    super({
      template: require('./interactiveMap.html'),
      resolve: {
        islands: preloader.load([
          { id: 'main', src: '../assets/images/map/ile3.png' }
        ]).getPromise()
      },
      model: {}
    });
  }

  ready() {
    this.world = new World(this.$el.clientWidth, this.$el.clientHeight);
  }

  resolved() {
    var i = new Island(220, 90, 341, 382, {
      locked: false,
      image: this.resolvedData.islands['main'].src
    });
    this.world.addIsland(i);
    this.world.appendTo(this.$el);
    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.world.render();
  }
}