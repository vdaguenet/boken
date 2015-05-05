'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './page-numbers.html';

export default class PageNumber extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        current: 0,
        max: 0
      })
    });
  }
}