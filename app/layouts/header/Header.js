'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';
import classes from 'dom-classes';

import template from './header.html';

class Header extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {},
      resolve: {}
    });

    this.$bag = this.$el.querySelector('.header-button');
    this.$map = this.$el.querySelector('.header-button.map');
    this._isBag = true;
  }

  ready() {
    on(this.$el, 'touchend', this.onTap.bind(this));
  }

  destroying() {
    off(this.$el, 'touchend', this.onTap.bind(this));
  }

  toggleButton() {
    let tl = new TimelineMax();

    if (this._isBag) {
      tl.fromTo(this.$map, 0.6, {alpha: 0, rotationY: 90, transformPerspective: 200}, {alpha: 1, rotationY: 0, ease: Expo.easeOut}, 0);
      tl.to(this.$bag, 0.6, {alpha: 0, rotationY: -90, transformPerspective: 200, ease: Expo.easeOut}, 0);
    } else {
      tl.fromTo(this.$bag, 0.6, {alpha: 0, rotationY: 90, transformPerspective: 200}, {alpha: 1, rotationY: 0, ease: Expo.easeOut}, 0);
      tl.to(this.$map, 0.6, {alpha: 0, rotationY: -90, transformPerspective: 200, ease: Expo.easeOut}, 0);

    }

    this._isBag = !this._isBag;
  }

  onTap() {
    if (this._isBag) {
      this.emit('menu:open');
    } else {
      this.emit('exercice:close');
    }
  }
}

export default new Header();