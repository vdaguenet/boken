'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';

import template from './help-button.html';

export default class HelpButton extends View {
  constructor(model) {
    super({
      template: template
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