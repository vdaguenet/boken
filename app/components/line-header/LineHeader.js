'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import nextTick from 'just-next-tick';

import template from './line-header.html';

export default class LineHeader extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        title: 'Line header'
      }),
      compose: {}
    });

    this.$lineLeft = this.$el.querySelector('.line.left');
    this.$lineRight = this.$el.querySelector('.line.right');
    this.$title = this.$el.querySelector('span');
  }

  ready() {}

  resize() {
    nextTick(() => {
      this.$lineLeft.style.width = 'calc(50% - ' + (0.5*this.$title.offsetWidth + 15)  + 'px)';
      this.$lineRight.style.width = 'calc(50% - ' + (0.5*this.$title.offsetWidth + 15)  + 'px)';
      this.$lineRight.style.top = this.$lineLeft.style.top =  (-this.$el.clientHeight / 3 ) + 'px';
    });
  }
}