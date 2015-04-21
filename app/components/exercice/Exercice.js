'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import defaults from 'defaults';
import classes from 'dom-classes';

import template from './exercice.html';

export default class Exercice extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        id: -1
      })
    });
  }

  ready() {
    this.$back = this.$el.querySelector('#back');
    this.$back.addEventListener('click', this.close.bind(this));
    this.$back.addEventListener('touchend', this.close.bind(this));
  }

  destroying() {

  }

  resolved() {

  }

  resize() {

  }

  open(id) {
    classes.add(this.$el, 'active');
    TweenMax.to(this.$el, 0.6, {alpha: 1, ease: Expo.easeOut});
  }

  close() {
    TweenMax.to(this.$el, 0.6, {alpha: 0, ease: Expo.easeOut, onComplete: () => {
      classes.remove(this.$el, 'active');
      this.emit('exercice:success');
    }});
  }

}