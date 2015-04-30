'use strict';

import View from 'brindille-view';

import template from './help-button.html';

export default class HelpButton extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: {}
    });
  }
}