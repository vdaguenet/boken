'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './sort-question.html';

export default class SortQuestion extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        question: {}
      }),
      compose: {}
    });
  }

  hide() {
    this.$el.style.display = 'none';
  }

  show() {
    this.$el.style.display = '';
  }
}