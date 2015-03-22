'use strict';

import World from './objects2D/World.js';

var factory = require('lib/factory');
var modulesApi = require('lib/services/module-api');

var InteractiveMap = factory.view({
  template: require('./interactiveMap.html'),
  resolve: {
    modules: modulesApi.findAll()
  },
  model: {}
});

InteractiveMap.prototype.ready = function() {
  this.world = new World(this.$el.clientWidth, this.$el.clientHeight);
};

InteractiveMap.prototype.resolved = function() {
  this.world.addIslands(this.resolvedData.modules);
  this.world.appendTo(this.$el);
  console.log(this.world);
  requestAnimationFrame( this.animate.bind(this) );
};

InteractiveMap.prototype.animate = function() {
  this.world.render();
};

module.exports = InteractiveMap;