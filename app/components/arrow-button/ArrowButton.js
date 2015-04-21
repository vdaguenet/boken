'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './arrow-button.html';

export default class ArrowButton extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        label: 'Button',
        direction: 'left'
      })
    });

    if ('left' === this.model.direction) {
      this.$el.querySelector('.left').style.display = '';
      this.$el.querySelector('.right').style.display = 'none';
    } else {
      this.$el.querySelector('.left').style.display = 'none';
      this.$el.querySelector('.right').style.display = '';
    }
  }

  ready() {

  }

  destroying() {

  }

}