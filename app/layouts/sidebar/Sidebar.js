'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';

import template from './sidebar.html';
import MenuButton from 'components/menu-button/MenuButton'

class Sidebar extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {
        'menu-button': MenuButton
      },
      resolve: {}
    });
  }

  ready() {
    this.$menu = this.$el.querySelector('.menu');
    setTimeout(() => {
      this.$menu.style.height = this.$parentEl.offsetHeight + 'px';
    }, 0);
  }

  destroying() {

  }

}

export default new Sidebar();