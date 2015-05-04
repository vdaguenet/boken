'use strict';

import View from 'brindille-view';
import defaults from 'defaults';

import template from './complete-question.html';

export default class CompleteQuestion extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        question: {},
        sentences: []
      }),
      compose: {}
    });

    this.puplisAnswers = {};
  }

  getPupilAnswers() {
    let count = 0;
    for (let input of this.$el.querySelectorAll('input[type="text"]')) {
      if (input.value !== '') {
        this.puplisAnswers[this.model.question.sentences[count].subject] = input.value;
      }
      count++;
    }

    return this.puplisAnswers;
  }

  reset() {
    this.puplisAnswers = {};
    this.model.sentences = [];
  }

  hide() {
    this.$el.style.display = 'none';
  }

  show() {
    this.$el.style.display = '';

    for (let sentence of this.model.question.sentences) {
      this.model.sentences.push(sentence.subject.replace('[ANSWER]', '<input type="text" placeholder="' + sentence.clue + '"/>'));
    }
  }
}