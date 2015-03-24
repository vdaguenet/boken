'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import scrollUtil from 'brindille-scroll';

import template from './collective-exercice.html';

export default class CollectiveExercice extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {},
      resolve: {}
    });
  }

  ready() {
    console.log('CollectiveExercice is ready');
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
