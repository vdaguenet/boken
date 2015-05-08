'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import {on, off} from 'dom-event';

import LineHeader from 'components/line-header/LineHeader';
import BorderButton from 'components/border-button/BorderButton';

import template from './help-modal.html';

export default class HelpModal extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        exercice: {}
      }),
      compose: {
        'line-header': LineHeader,
        'border-button': BorderButton
      }
    });

    on(this.refs.backBtn.$el, 'touchend', this.close.bind(this));
  }

  destroying() {
    off(this.refs.backBtn.$el, 'touchend', this.close.bind(this));
  }

  close() {
    if (this.tl) {
      this.tl.kill();
    }
    this.tl.reverse();
  }

  open() {
    this.$el.style.zIndex = 1;
    this.tl = new TimelineMax({
      onReverseComplete: () => {
        this.$el.style.zIndex = -1;
      }
    });
    this.tl.fromTo(this.$el, 0.6, {y: 100, alpha: 0}, {y: 0, alpha: 1, ease: Expo.easeInOut});
  }
}