'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import scrollUtil from 'brindille-scroll';

import InteractiveMap from 'components/interactive-map/interactiveMap';

import template from './home.html';

export default class Home extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {
        'interactive-map': InteractiveMap
      },
      resolve: {}
    });
  }

  ready() {
    console.log('Home is ready');
  }

  transitionIn() {
    TweenMax.from(this.$el, 1, {
      alpha: 0,
      onComplete: this.onTransitionInComplete
    });
  }

  transitionOut() {
    TweenMax.to(this.$el, 1, {
      alpha: 0,
      onComplete: this.onTransitionOutComplete
    });
  }
}
