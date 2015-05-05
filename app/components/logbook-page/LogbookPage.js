'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import PageNumbers from 'components/page-numbers/PageNumbers';
import template from './logbook-page.html';

export default class LogbookPage extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        page: {},
        subchapter: {},
        current: 0,
        maxpages: 0
      }),
      compose: {
        'page-numbers': PageNumbers
      },
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
