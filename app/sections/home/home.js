'use strict';

var factory = require('lib/factory');
var preloader = require('brindille-preloader');
var resizeUtil = require('brindille-resize');
var scrollUtil = require('brindille-scroll');

var Home = factory.view({
  template: require('./home.html'),
  model: {},
  compose: {
    'interactive-map': require('components/interactive-map/interactiveMap')
  },
  resolve: {}
});

Home.prototype.ready = function() {
  console.log('Home is ready');
};

Home.prototype.transitionIn = function() {
  TweenMax.from(this.$el, 1, {
    alpha: 0,
    onComplete: this.onTransitionInComplete
  });
};

Home.prototype.transitionOut = function() {
  TweenMax.to(this.$el, 1, {
    alpha: 0,
    onComplete: this.onTransitionOutComplete
  });
};

module.exports = Home;
