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
        row1: []
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

    for (let i = 0, l = this.model.chapter.subChapters.length; i < l; i++) {
      subChapter = this.model.chapter.subChapters[i];

      if (this.model.userchapters[this.model.chapter.number - 1].indexOf(i) !== -1) {
        subChapter.validated = true;
      }

      this.model['row' + row].push(subChapter);

      if (i % 2 === 1) {
        row++;
      }
    }
  }

  transitionOut(callback) {
    let tl = new TimelineMax({
      onComplete: callback
    });
    tl.staggerTo(this.$el.querySelectorAll('.passport-grid-item'), 0.9, {alpha: 0, y: 100, ease: Expo.easeInOut}, -0.08, 0);
    tl.set(this.$el, {display: 'none'}, 0.9);
  }

  transitionIn() {
    let tl = new TimelineMax();
    tl.set(this.$el, {display: ''}, 0);
    tl.staggerFromTo(this.$el.querySelectorAll('.passport-grid-item'), 0.9, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Expo.easeOut}, 0.08, 0);
  }

}
