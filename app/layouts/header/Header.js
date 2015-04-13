'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';

import template from './header.html';

class Header extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {},
      resolve: {}
    });
  }

  ready() {
    on(this.$el, 'click', this.toggleMenu.bind(this));
  }

  destroying() {
    off(this.$el, 'click', this.toggleMenu.bind(this));
  }

  toggleMenu() {
    console.log('Toggle menu');
  }
}

export default new Header();