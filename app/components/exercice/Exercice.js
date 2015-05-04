'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import classes from 'dom-classes';
import HelpButton from 'components/help-button/HelpButton';
import LineHeader from 'components/line-header/LineHeader';
import BorderButton from 'components/border-button/BorderButton';
import Question from 'components/question/Question';
import * as ExerciceApi from 'services/exercice-api';
import * as LogbookApi from 'services/logbook-api';
import * as RewardApi from 'services/reward-api';
import * as PupilApi from 'services/pupil-api';

import template from './exercice.html';

export default class Exercice extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        exerciceid: 0,
        logbookid: 0,
        exercice: {},
        question: {},
        reward: {},
        user: {},
        msg: '',
        headertitle: 'Exercice title',
        btnlabel: 'Commencer le récit',
        endsentence: 'Phrase de fin',
        subject: ''
      }),
      compose: {
        'line-header': LineHeader,
        'border-button': BorderButton,
        'question': Question,
        'help-button': HelpButton
      }
    });
    this.refs.btnNext.on('tap', this.onNextTap.bind(this));
    this.refs.btnNextLogbook.on('tap', this.onNextTap.bind(this));
    this.refs.btnPrev.on('tap', this.onPrevTap.bind(this));
    this.$exerciceContainer = this.$el.querySelector('.exercice-container');
    this.$logbookContainer = this.$el.querySelector('.logbook-container');
    this.reset();
  }

  destroying() {
    this.refs.btnPrev.off('tap', this.onPrevTap.bind(this));
    this.refs.btnNext.off('tap', this.onNextTap.bind(this));
    this.refs.btnNextLogbook.off('tap', this.onNextTap.bind(this));
  }

  resolved() {
    if (this.resolvedData.exercice) {
      this._isExercice = true;
      this.toggleExerciceContainer();
      this.model.exercice = this.resolvedData.exercice;
      this._curStep = this.model.exercice.step;
      this.model.endsentence = this.model.exercice.chapter.subChapters[this._curStep].endSentence;
      this.model.headertitle = this.resolvedData.exercice.chapter.title;
      this.model.btnlabel = 'Commencer le récit';
    } else {
      this._isExercice = false;
      this.toggleExerciceContainer();
      this.model.exercice = this.resolvedData.logbook;
      this.model.subject = this.resolvedData.logbook.subject;
      this._curStep = this.resolvedData.logbook.step;
      this.model.headertitle = this.resolvedData.logbook.chapter.title;
      this.model.btnlabel = 'Écrire mon récit';
    }
  }

  toggleExerciceContainer() {
    let typeClass = '';
    if (this._isExercice) {
      typeClass = '.exercice-container';
      this.$exerciceContainer.style.display = '';
      this.$logbookContainer.style.display = 'none';
    } else {
      typeClass = '.logbook-container';
      this.$exerciceContainer.style.display = 'none';
      this.$logbookContainer.style.display = '';
      this.$logbookAnswer = this.$el.querySelector('#logbookanswer');
    }

    this.$intro = this.$el.querySelector(typeClass + ' .intro');
    this.$end = this.$el.querySelector(typeClass + ' .end');
    this.$end.style.display = 'none';
    this.$questionContainer = this.$el.querySelector(typeClass + ' .question');
    this.$questionContainer.style.display = 'none';
  }

  reset() {
    this.model.msg = '';
    this.model.headertitle = 'Exercice title';
    this.model.btnlabel = 'Commencer le récit';
    this.model.endsentence = 'Phrase de fin';
    this.model.subject = '';
    this._isExercice = true;
    this._end = false;
    this._verified = false;
    this._curQuestion = -1;
    this._logbookAnswers = [];
    this.resolvedData.exercice = ExerciceApi.findById(this.model.exerciceid);
    this.resolvedData.logbook = LogbookApi.findById(this.model.logbookid);
    this.refs.btnPrev.$el.style.display = 'none';
    classes.add(this.refs.btnPrev.$el, 'left');
    if (this.$logbookAnswer) {
      this.$logbookAnswer.value = '';
      this.$logbookAnswer.removeAttribute('readonly');
    }
    this.resolved();
  }

  open() {
    console.log('OPEN EXERCICE');
    this.reset();
    classes.add(this.$el, 'active');
  }

  close() {
    console.log('CLOSE EXERCICE');
    classes.remove(this.$el, 'active');
  }

  onNextTap() {
    if (this._end) {
      this.close();
      return;
    }

    if (!this._verified && this._curQuestion > -1 && this._isExercice) {
      let res = this.refs.question.checkAnswers();
      this._verified = true;

      if (false === res.status) {
        this.model.msg = res.message;
        return;
      }
    } else if (!this._isExercice && this.$logbookAnswer.value !== '') {
      this._logbookAnswers.push(this.$logbookAnswer.value);
      this.$logbookAnswer.value = '';
    }

    this._curQuestion++;
    this.model.msg = '';
    this._verified = false;


    if (this.model.exercice.questions[this._curQuestion]) {
      this.$intro.style.display = 'none';
      this.$questionContainer.style.display = '';

      if (this._isExercice) {
        this.showExerciceQuestion();
      } else {
        classes.add(this.refs.btnNextLogbook.$el, 'right');
        this.refs.btnPrev.$el.style.display = '';
        this.showLogbookQuestion();
      }

      this.refs.question.update();
      this.$el.querySelector('.line-header span').style.fontSize = '';
    } else {
      this._end = true;
      this.displayEndScreen();
    }

    this.refs.header.resize();
    this.refs.headerLogbook.resize();
  }

  onPrevTap() {
    if (this._isExercice) return;

    this._curQuestion--;

    if (this.model.exercice.questions[this._curQuestion]) {
      this.showLogbookQuestion();
    } else {
      this.$intro.style.display = '';
      this.$questionContainer.style.display = 'none';
      classes.remove(this.refs.btnNextLogbook.$el, 'right');
      this.refs.btnPrev.$el.style.display = 'none';
      this.model.subject = '';
    }
  }

  showExerciceQuestion() {
    this.model.question = this.model.exercice.questions[this._curQuestion];
    this.model.headertitle = this.model.exercice.questions[this._curQuestion].instructions;
    this.model.btnlabel = 'Valider';
  }

  showLogbookQuestion() {
    this.model.headertitle = this.resolvedData.logbook.subject;
    this.model.subject = this.resolvedData.logbook.intro;

    if (this._logbookAnswers[this._curQuestion]) {
      this.$logbookAnswer.value = this._logbookAnswers[this._curQuestion];
    }

    if (this.resolvedData.logbook.questions[this._curQuestion] === 'validation') {
      classes.remove(this.refs.btnNextLogbook.$el, 'right');
      this.refs.btnPrev.$el.style.display = 'none';
      this.$logbookAnswer.setAttribute('readonly', '');
      this.$logbookAnswer.value = this._logbookAnswers.join('\n');
      this.model.question = '';
      this.model.btnlabel = 'Valider';
      PupilApi.saveLogbookPage(this.model.user, {
        chapter: this.model.exercice.chapter.number - 1,
        subChapter: this._curStep,
        answer: this.$logbookAnswer.value
      });
    } else {
      this.model.question = this.resolvedData.logbook.questions[this._curQuestion];
      this.model.btnlabel = 'Continuer';
    }
  }

  displayEndScreen() {
    this.$questionContainer.style.display = 'none';
    this.$end.style.display = '';
    this.model.headertitle = 'Bravo !';
    this.model.btnlabel = 'Retour à la carte';
    if (this._isExercice) {
      this.getReward();
      PupilApi.saveExercice(this.model.user, this.model.exerciceid);
      this.$el.querySelector('.exercice-container .line-header span').style.fontSize = '50px';
    } else {
      this.model.subject = '';
      this.$el.querySelector('.logbook-container .line-header span').style.fontSize = '50px';
    }
  }

  getReward() {
    let randomRewardId = Math.floor(Math.random() * this.model.exercice.chapter.subChapters[this._curStep].rewards.length);

    if (this.model.user.rewards.indexOf(this.model.exercice.chapter.subChapters[this._curStep].rewards[randomRewardId]) !== -1) {
      this.getReward();
      return;
    }

    PupilApi.saveReward(this.model.user, this.model.exercice.chapter.subChapters[this._curStep].rewards[randomRewardId]);
    this.model.reward = RewardApi.findById(this.model.exercice.chapter.subChapters[this._curStep].rewards[randomRewardId]);
  }
}