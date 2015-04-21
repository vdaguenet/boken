'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import template from './passport-grid.html';

export default class ChestGrid extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {

      }),
      compose: {},
      resolve: {}
    })
  }

  ready() {

  }

  destroying() {

  }

  transitionOut() {
    this.$el.style.display = 'none';
  }

  transitionIn() {
    this.$el.style.display = '';
  }

}
