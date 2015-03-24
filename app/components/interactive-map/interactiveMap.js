'use strict';

import View from 'brindille-view';
import World from './objects2D/World.js';
import * as modulesApi from 'lib/services/module-api';

export default class InteractiveMap extends View {
  constructor() {
    super({
      template: require('./interactiveMap.html'),
      resolve: {
        modules: modulesApi.findAll()
      },
      model: {}
    });
  }

  ready() {
    this.world = new World(this.$el.clientWidth, this.$el.clientHeight);
  }

  resolved() {
    this.world.addIslands(this.resolvedData.modules);
    this.world.appendTo(this.$el);
    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.world.render();
  }
}