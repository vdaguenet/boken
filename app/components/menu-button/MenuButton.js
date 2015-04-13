'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './menu-button.html';

export default class MenuButton extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        path: '',
        label: ''
      })
    });
  }

  ready() {

  }

  destroying() {

  }

}