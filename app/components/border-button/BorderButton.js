'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import {on, off} from 'dom-event';

import template from './border-button.html';

export default class BorderButton extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        label: 'Button'
      })
    });

    on(this.$el, 'touchend', this.onTap.bind(this));
  }

  onTap() {
    this.emit('tap');
  }

  destroying() {
    off(this.$el, 'touchend', this.onTap.bind(this));
  }

}