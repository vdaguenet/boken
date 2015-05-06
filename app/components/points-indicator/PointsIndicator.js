'use strict';

import View from 'brindille-view';
import classes from 'dom-classes';
import defaults from 'defaults';
import template from './points-indicator.html';

export default class PointsIndicator extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        number: 5
      })
    });

    this.current = 0;
    this.$points = this.$el.querySelectorAll('.point');
    this.toggleSixthPoint();
    classes.add(this.$points[this.current], 'active');
  }

  toggleSixthPoint() {
    for (let i = 0; i < this.$points.length; i++) {
      if (i < this.model.number) {
        classes.remove(this.$points[i], 'hidden');
      } else {
        classes.add(this.$points[i], 'hidden');
      }
    }

    if (this.model.number === 6) {
      classes.add(this.$el, 'six-points');
    }
  }

  update(id) {
    this.current = id;
    classes.remove(this.$el.querySelector('.point.active'), 'active');
    classes.add(this.$points[this.current], 'active');
  }

  show() {
    this.toggleSixthPoint();
    TweenMax.to(this.$el, 0.4, {alpha: 1, ease: Expo.easeInOut});
  }

  hide() {
    TweenMax.to(this.$el, 0.4, {alpha: 0, ease: Expo.easeInOut});
  }
}
