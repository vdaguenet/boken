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
      this.addEvents();
    }, 0);
  }

  addEvents() {
    on(this.refs.map.$el, 'click', this.close.bind(this));
    on(this.refs.map.$el, 'tap', this.close.bind(this));
  }

  open() {
    TweenMax.to(this.$parentEl, 0.6, {xPercent: -100});
  }

  close() {
    TweenMax.to(this.$parentEl, 0.6, {xPercent: 0});
  }

  destroying() {
    off(this.refs.map.$el, 'click', this.close.bind(this));
    off(this.refs.map.$el, 'tap', this.close.bind(this));
  }

}

export default new Sidebar();