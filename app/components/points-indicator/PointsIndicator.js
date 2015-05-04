'use strict';

import View from 'brindille-view';
import classes from 'dom-classes';

import template from './points-indicator.html';

export default class PointsIndicator extends View {
  constructor() {
    super({
      template: template
    });

    this.current = 0;
    this.$points = this.$el.querySelectorAll('.point');
    classes.add(this.$points[this.current], 'active');
  }

  update(id) {
    this.current = id;
    classes.remove(this.$el.querySelector('.point.active'), 'active');
    classes.add(this.$points[this.current], 'active');
  }

  show() {
    TweenMax.to(this.$el, 0.4, {alpha: 1, ease: Expo.easeInOut});
  }

  hide() {
    TweenMax.to(this.$el, 0.4, {alpha: 0, ease: Expo.easeInOut});
  }
}
