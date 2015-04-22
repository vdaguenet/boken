'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import template from './passport-grid.html';

export default class ChestGrid extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        chapter: {},
        userchapters: {},
        row0: [],
        row1: [],
        row2: []
      }),
      compose: {},
      resolve: {}
    })
  }

  ready() {

  }

  destroying() {

  }

  initGrid() {
    let row = 0;
    let subChapter;

    this.model.row0 = [];
    this.model.row1 = [];
    this.model.row2 = [];

    for (let i = 0, l = this.model.chapter.subChapters.length; i < l; i++) {
      subChapter = this.model.chapter.subChapters[i];

      if (this.model.userchapters[this.model.chapter.number - 1].indexOf(i) !== -1) {
        subChapter.validated = true;
      }

      this.model['row' + row].push(subChapter);

      if (i % 3 === 2) {
        row++;
      }
    }
  }

  transitionOut() {
    this.$el.style.display = 'none';
  }

  transitionIn() {
    this.$el.style.display = '';
  }

}
