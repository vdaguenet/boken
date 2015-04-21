'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import template from './chest-grid.html';

export default class ChestGrid extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        chapter: {},
        user: {},
        row0: [],
        row1: [],
        row2: [],
        row3: [],
      }),
      compose: {},
      resolve: {}
    });

  }

  ready() {

  }

  initGrid(rewards) {
    let row = 0;
    let reward;

    this.model['row' + row] = [];
    for (let i = 0, l = this.model.chapter.rewards.length; i < l; i++) {
      reward = rewards[this.model.chapter.rewards[i]];

      if (!reward) continue;

      reward.active = (this.model.user.rewards.indexOf(this.model.chapter.rewards[i]) !== -1);
      this.model['row' + row].push(reward);

      if (i % 4 === 3) {
        row++;
        this.model['row' + row] = [];
      }
    }
  }

  destroying() {

  }

  transitionOut() {
    this.$el.style.display = 'none';
  }

  transitionIn() {
    this.$el.style.display = '';
  }

}
