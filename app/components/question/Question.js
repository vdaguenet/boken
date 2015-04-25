'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import LinkQuestion from 'components/link-question/LinkQuestion';
import SortQuestion from 'components/sort-question/SortQuestion';
import CompleteQuestion from 'components/complete-question/CompleteQuestion';

import template from './question.html';

export default class Question extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        question: {}
      }),
      compose: {
        'link-question': LinkQuestion,
        'sort-question': SortQuestion,
        'complete-question': CompleteQuestion
      }
    });
  }

  update() {
    switch(this.model.question.type) {
      case 'link':
        this.refs.linkQuestion.show();
        this.refs.sortQuestion.hide();
        this.refs.completeQuestion.hide();
        break;
      case 'sort':
        this.refs.linkQuestion.hide();
        this.refs.sortQuestion.show();
        this.refs.completeQuestion.hide();
        break;
      case 'complete':
        this.refs.linkQuestion.hide();
        this.refs.sortQuestion.hide();
        this.refs.completeQuestion.show();
        break;
    }
  }
}