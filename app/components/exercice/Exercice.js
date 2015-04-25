'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import classes from 'dom-classes';
import LineHeader from 'components/line-header/LineHeader';
import BorderButton from 'components/border-button/BorderButton';
import Question from 'components/question/Question';
import * as ExerciceApi from 'services/exercice-api';

import template from './exercice.html';

export default class Exercice extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {
        exercice: ExerciceApi.findById(model.id)
      },
      model: defaults(model, {
        id: 0,
        exercice: {},
        question: {},
        headertitle: 'Exercice title',
        btnlabel: 'Commencer le récit'
      }),
      compose: {
        'line-header': LineHeader,
        'border-button': BorderButton,
        'question': Question
      }
    });
    this._end = false;
    this._curQuestion = -1;
    this.refs.btnNext.on('tap', this.onNextTap.bind(this));
    this.$intro = this.$el.querySelector('.intro');
    this.$end = this.$el.querySelector('.end');
    this.$end.style.display = 'none';
    this.$questionContainer = this.$el.querySelector('.question');
    this.$questionContainer.style.display = 'none';
  }

  destroying() {
    this.refs.btnNext.off('tap', this.onNextTap.bind(this));
  }

  resolved() {
    this.model.exercice = this.resolvedData.exercice;
    this.model.headertitle = this.resolvedData.exercice.chapter.title;
  }

  open(id) {
    console.log('OPEN EXERCICE');
  }

  close() {
    console.log('CLOSE EXERCICE');
  }

  onNextTap() {
    if (this._end) {
      this.close();
      return;
    }

    this._curQuestion++;

    if (this.model.exercice.questions[this._curQuestion]) {
      this.$intro.style.display = 'none';
      this.$questionContainer.style.display = '';
      this.model.question = this.model.exercice.questions[this._curQuestion];
      this.model.headertitle = this.model.exercice.questions[this._curQuestion].instructions;
      this.model.btnlabel = 'Valider';
      this.refs.question.update();
    } else {
      this.$questionContainer.style.display = 'none';
      this.$end.style.display = '';
      this.model.question = {};
      this.model.headertitle = 'Bravo !';
      this.model.btnlabel = 'Retour à la carte';
      this._end = true;
    }

    this.refs.header.resize();
  }

}