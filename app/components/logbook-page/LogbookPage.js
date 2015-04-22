'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import template from './logbook-page.html';

export default class LogbookPage extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        page: {},
        subchapter: {}
      }),
      compose: {},
      resolve: {}
    });
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
