'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import {on, off} from 'dom-event';
import ArrowButton from 'components/arrow-button/ArrowButton';
import template from './prev-next-button.html';

export default class PrevNextButton extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        nextlabel: 'Suivant',
        prevlabel: 'Précédent',
      }),
      compose: {
        'arrow-button': ArrowButton
      }
    });

    on(this.refs.next.$el, 'touchend', this.onNextClick.bind(this));
    on(this.refs.previous.$el, 'touchend', this.onPreviousClick.bind(this));
  }

  ready() {

  }

  destroying() {
    off(this.refs.next.$el, 'touchend', this.onNextClick.bind(this));
    off(this.refs.previous.$el, 'touchend', this.onPreviousClick.bind(this));
  }

  onNextClick() {
    this.emit('next')
  }

  onPreviousClick() {
    this.emit('previous');
  }

}