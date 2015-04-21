'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './chapter-header.html';

export default class ChapterHeader extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        chapter: {}
      })
    });
  }

  ready() {
  }

  destroying() {

  }

}