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

    this.currentQuestion = undefined;
  }

  checkAnswers() {
    let pupilAnswers = this.currentQuestion.getPupilAnswers();
    let originalSentence;
    let nbMistakes = 0;
    let countPupilAnswers = 0;
    let msg = '';
    let status = true;

    for (let sentence in pupilAnswers) {
      originalSentence = this.model.question.sentences.filter((item) => item.subject === sentence)[0];
      if (originalSentence && pupilAnswers[sentence] !== originalSentence.answer) {
        nbMistakes++;
      }
      countPupilAnswers++;
    }

    if (nbMistakes > 0) {
      status = false;
      msg = `Il y a ${nbMistakes} fautes. Essayes de les corriger.`;
    }

    if (countPupilAnswers !== this.model.question.sentences.length) {
      status = false;
      msg = `Attention ! Tu n'as pas répondu à toutes les questions.`;
    }

    return {
      status: status,
      message: msg
    };
  }

  reset() {
    this.refs.linkQuestion.reset();
    this.refs.sortQuestion.reset();
    this.refs.completeQuestion.reset();
  }

  update() {
    switch (this.model.question.type) {
      case 'link':
        this.refs.linkQuestion.show();
        this.currentQuestion = this.refs.linkQuestion;
        this.refs.sortQuestion.hide();
        this.refs.completeQuestion.hide();
        break;
      case 'sort':
        this.refs.linkQuestion.hide();
        this.refs.sortQuestion.show();
        this.currentQuestion = this.refs.sortQuestion;
        this.refs.completeQuestion.hide();
        break;
      case 'complete':
        this.refs.linkQuestion.hide();
        this.refs.sortQuestion.hide();
        this.refs.completeQuestion.show();
        this.currentQuestion = this.refs.completeQuestion;
        break;
      default:
        this.currentQuestion = undefined;
        break;
    }
  }
}