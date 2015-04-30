'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import HelpButton from 'components/help-button/HelpButton';
import LineHeader from 'components/line-header/LineHeader';
import BorderButton from 'components/border-button/BorderButton';
import Question from 'components/question/Question';
import * as ExerciceApi from 'services/exercice-api';
import * as RewardApi from 'services/reward-api';

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
        msg: '',
        exercice: {},
        question: {},
        reward: {},
        user: {},
        headertitle: 'Exercice title',
        btnlabel: 'Commencer le récit',
        endsentence: 'Phrase de fin'
      }),
      compose: {
        'line-header': LineHeader,
        'border-button': BorderButton,
        'question': Question,
        'help-button': HelpButton
      }
    });
    this._end = false;
    this._verified = false;
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
    this._curStep = this.model.exercice.step;
    this.model.endsentence = this.model.exercice.chapter.subChapters[this._curStep].endSentence;
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

    if (!this._verified && this._curQuestion > -1) {
       let res = this.refs.question.checkAnswers();
      this._verified = true;

      if (false === res.status) {
        this.model.msg = res.message;
        return;
      }
    }

    this._curQuestion++;
    this.model.msg = '';
    this._verified = false;

    if (this.model.exercice.questions[this._curQuestion]) {
      this.$intro.style.display = 'none';
      this.$questionContainer.style.display = '';
      this.model.question = this.model.exercice.questions[this._curQuestion];
      this.model.headertitle = this.model.exercice.questions[this._curQuestion].instructions;
      this.model.btnlabel = 'Valider';
      this.refs.question.update();
      this.$el.querySelector('.line-header span').style.fontSize = '';
    } else {
      this.$questionContainer.style.display = 'none';
      this.$end.style.display = '';
      this.model.question = {};
      this._curQuestion = -1;
      this.$el.querySelector('.line-header span').style.fontSize = '50px';
      this.model.headertitle = 'Bravo !';
      this.model.btnlabel = 'Retour à la carte';
      this.getReward();
      this._end = true;
    }

    this.refs.header.resize();
  }

  getReward() {
    let randomRewardId = Math.floor(Math.random() * this.model.exercice.chapter.subChapters[this._curStep].rewards.length);

    if (this.model.user.rewards.indexOf(this.model.exercice.chapter.subChapters[this._curStep].rewards[randomRewardId]) !== -1) {
      this.getReward();
      return;
    }

    this.model.reward = RewardApi.findById(this.model.exercice.chapter.subChapters[this._curStep].rewards[randomRewardId]);
    console.log('model', this.model.reward);
  }

}