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
    let i = 0;
    let reward;

    this.model.row0 = [];
    this.model.row1 = [];
    this.model.row2 = [];
    this.model.row3 = [];

    for (let subChapter of this.model.chapter.subChapters) {
      for (let rewardId of subChapter.rewards) {
        reward = rewards[rewardId];

        if (!reward) continue;

        reward.active = (this.model.user.rewards.indexOf(rewardId) !== -1);
        this.model['row' + row].push(reward);

        if (i % 4 === 3) {
          row++;
        }

        i++;
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
