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
    on(this.$el, 'touchend', this.openMenu.bind(this));
  }

  destroying() {
    off(this.$el, 'touchend', this.openMenu.bind(this));
  }

  openMenu() {
    this.emit('menu:open');
  }
}

export default new Header();