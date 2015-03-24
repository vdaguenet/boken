'use strict';

import View from 'brindille-view';

import template from './footer.html';

class Footer extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {},
      resolve: {}
    });
  }
}

export default new Footer();