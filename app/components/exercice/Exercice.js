'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import classes from 'dom-classes';
import HelpButton from 'components/help-button/HelpButton';
import HelpModal from 'components/help-modal/HelpModal';
import LineHeader from 'components/line-header/LineHeader';
import BorderButton from 'components/border-button/BorderButton';
import Question from 'components/question/Question';
import nextTick from 'just-next-tick';
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
        'help-button': HelpButton,
        'help-modal': HelpModal
      }
    });
    this.refs.btnNext.on('tap', this.onNextTap.bind(this));
    this.refs.btnNextLogbook.on('tap', this.onNextTap.bind(this));
    this.refs.btnPrev.on('tap', this.onPrevTap.bind(this));
    this.refs.btnHelp.on('tap', this.onHelpTap.bind(this));
    this.$exerciceContainer = this.$el.querySelector('.exercice-container');
    this.$logbookContainer = this.$el.querySelector('.logbook-container');
    this.reset();
  }

  _setExerciceTimelines() {
    let $content = this.$el.querySelector('.content');
    let $header = this.$el.querySelector('.exercice-container .line-header');
    let $headerLineLeft = this.$el.querySelector('.exercice-container .line-header h1 .line.left');
    let $headerLineRight = this.$el.querySelector('.exercice-container .line-header h1 .line.right');
    let $subject = this.$el.querySelector('.exercice-container .subject');
    let $introImg = this.$el.querySelector('.exercice-container .intro img');
    let $introText = this.$el.querySelector('.exercice-container .intro .intro-text');
    let $btn = this.$el.querySelector('.exercice-container .border-button');
    let $points = document.querySelectorAll('.points-indicator li');
    let $middle = this.$el.querySelector('.middle-part');

    this._tlShowExo = new TimelineMax();
    this._tlShowExo.staggerFromTo([$header, $subject, this.refs.btnHelp.$el, $introImg, $introText, $btn], 1.2, {alpha: 0, y: 120}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 0.1);
    this._tlShowExo.fromTo($content, 0.7, {alpha: 0, y: 100}, {y: 0, alpha: 1, ease: Cubic.easeOut}, 0.3);
    this._tlShowExo.fromTo($headerLineLeft, 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.9);
    this._tlShowExo.fromTo($headerLineRight, 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.9);
    this._tlShowExo.staggerFromTo($points, 0.6, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 1.1);
    this._tlShowExo.pause(0);

    this._tlHideExo = new TimelineMax({
      onComplete: () => {
        this.emit('close');
        classes.remove(this.$el, 'active');
      }
    });
    this._tlHideExo.staggerTo($points, 0.6, {alpha: 0, y: 50, ease: Expo.easeInOut}, -0.08, 0);
    this._tlHideExo.to($headerLineLeft, 0.6, {scaleX: 0, ease: Expo.easeInOut}, 0.2);
    this._tlHideExo.to($headerLineRight, 0.6, {scaleX: 0, ease: Expo.easeInOut}, 0.2);
    this._tlHideExo.staggerTo([$btn, $middle, this.refs.btnHelp.$el, $header], 0.8, {alpha: 0, y: 120, ease: Expo.easeInOut, clearProps: 'all'}, 0.08, 0.3);
    this._tlHideExo.to($content, 0.6, {alpha: 0, y: 100}, 0.7);
    this._tlHideExo.pause(0);
  }

  _setLogbookTimelines() {
    let $content = this.$el.querySelector('.content');
    let $points = document.querySelectorAll('.points-indicator li');
    let $middle = this.$el.querySelector('.middle-part');
    let $header = this.$el.querySelector('.logbook-container .line-header');
    let $headerLineLeft = this.$el.querySelector('.logbook-container .line-header h1 .line.left');
    let $headerLineRight = this.$el.querySelector('.logbook-container .line-header h1 .line.right');
    let $subject = this.$el.querySelector('.logbook-container .subject');
    let $introImg = this.$el.querySelector('.logbook-container .intro img');
    let $introText = this.$el.querySelector('.logbook-container .intro .intro-text');
    let $btn = this.$el.querySelector('.logbook-container .border-button');

    this._tlShowLogbook = new TimelineMax();
    this._tlShowLogbook.staggerFromTo([$header, $subject, $introImg, $introText, $btn], 1.2, {alpha: 0, y: 120}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 0.1);
    this._tlShowLogbook.fromTo($content, 0.7, {alpha: 0, y: 100}, {y: 0, alpha: 1, ease: Cubic.easeOut}, 0.3);
    this._tlShowLogbook.fromTo($headerLineLeft, 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.9);
    this._tlShowLogbook.fromTo($headerLineRight, 0.6, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.9);
    this._tlShowLogbook.staggerFromTo($points, 0.6, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 1.1);
    this._tlShowLogbook.pause(0);

    this._tlHideLogbook = new TimelineMax({
      onComplete: () => {
        this.emit('close');
        classes.remove(this.$el, 'active');
      }
    });
    this._tlHideLogbook.staggerTo($points, 0.6, {alpha: 0, y: 50, ease: Expo.easeInOut}, -0.08, 0);
    this._tlHideLogbook.to($headerLineLeft, 0.6, {scaleX: 0, ease: Expo.easeInOut}, 0.2);
    this._tlHideLogbook.to($headerLineRight, 0.6, {scaleX: 0, ease: Expo.easeInOut}, 0.2);
    this._tlHideLogbook.staggerTo([$btn, $middle, $header], 0.8, {alpha: 0, y: 120, ease: Expo.easeInOut, clearProps: 'all'}, 0.08, 0.3);
    this._tlHideLogbook.to($content, 0.6, {alpha: 0, y: 100}, 0.7);
    this._tlHideLogbook.pause(0);
  }

  _setTimelines() {
    let $content = this.$el.querySelector('.content');

    this._tlNextQuestion = new TimelineMax();
    this._tlNextQuestion.fromTo($content, 0.7, {alpha: 1, x: 0}, {alpha: 0, x: -400, ease: Expo.easeIn}, 0);
    this._tlNextQuestion.to($content, 0.1, {x: 400}, 0.7);
    this._tlNextQuestion.addCallback(this._setNextQuestion.bind(this), 0.7);
    this._tlNextQuestion.to($content, 0.7, {alpha: 1, x: 0, ease: Expo.easeOut, clearProps: 'opacity, transform'}, 1.2);
    this._tlNextQuestion.pause(0);

    this._tlPrevQuestion = new TimelineMax();
    this._tlPrevQuestion.fromTo($content, 0.7, {alpha: 1, x: 0}, {alpha: 0, x: 400, ease: Expo.easeIn}, 0);
    this._tlPrevQuestion.to($content, 0.1, {x: -400}, 0.7);
    this._tlPrevQuestion.addCallback(this._setPrevQuestion.bind(this), 0.7);
    this._tlPrevQuestion.to($content, 0.7, {alpha: 1, x: 0, ease: Expo.easeOut, clearProps: 'opacity, transform'}, 1.2);
    this._tlPrevQuestion.pause(0);

    this._setExerciceTimelines();
    this._setLogbookTimelines();
  }

  destroying() {
    this.refs.btnPrev.off('tap', this.onPrevTap.bind(this));
    this.refs.btnNext.off('tap', this.onNextTap.bind(this));
    this.refs.btnNextLogbook.off('tap', this.onNextTap.bind(this));
  }

  onReset() {

    if (this.resolvedData.exercice) {
      this._isExercice = true;
      this.toggleExerciceContainer();
      this.model.exercice = this.resolvedData.exercice;
      this.model.subject = this.resolvedData.exercice.subject;
      this._curStep = this.resolvedData.exercice.step;
      this.model.endsentence = this.model.exercice.endSentence;
      this.model.headertitle = this.resolvedData.exercice.title;
      this.model.btnlabel = 'Continuer le récit';
      nextTick(() => {
        this.refs.header.resize();
        this._setTimelines();
      });

    } else {
      this._isExercice = false;
      this.toggleExerciceContainer();
      this.model.exercice = this.resolvedData.logbook;
      this.model.subject = this.resolvedData.logbook.subject;
      this._curStep = this.resolvedData.logbook.step;
      this.model.headertitle = this.resolvedData.logbook.chapter.subChapters[this._curStep].title;
      this.model.btnlabel = 'Écrire mon journal';
      nextTick(() => {
        this.refs.headerLogbook.resize();
        this._setTimelines();
      });
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
    this.$intro.style.display = '';
    this.$end = this.$el.querySelector(typeClass + ' .end');
    this.$end.style.display = 'none';
    this.$questionContainer = this.$el.querySelector(typeClass + ' .question');
    this.$questionContainer.style.display = 'none';
  }

  reset() {
    this.refs.question.reset();
    this.emit('indicator:update', 0);

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

    this.$el.querySelector('.exercice-container .line-header span').style.fontSize = '';
    this.$el.querySelector('.logbook-container .line-header span').style.fontSize = '';

    this.onReset();
  }

  open() {
    this.reset();
    this._point = ExerciceApi.findByExerciceAndLogbookId(this.model.exerciceid, this.model.logbookid);
    classes.add(this.$el, 'active');
    if (this._isExercice) {
      this._tlShowExo.play(0);
    } else {
      this._tlShowLogbook.play(0);
    }
  }

  close() {
    if (this._isExercice) {
      this._tlShowExo.kill();
      this.refs.helpModal.close();
      this._tlHideExo.play(0);
    } else {
      this._tlShowLogbook.kill();
      this._tlHideLogbook.play(0);
    }
  }

  onHelpTap() {
    this.refs.helpModal.open();
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

    this._tlNextQuestion.play(0);
  }

  _setNextQuestion() {
    this._curQuestion++;
    this.model.msg = '';
    this.model.subject = '';
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

    this.emit('indicator:update', this._curQuestion + 1);
    this.refs.header.resize();
    this.refs.headerLogbook.resize();
  }

  _setPrevQuestion() {
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

    this.emit('indicator:update', this._curQuestion + 1);
    this.refs.header.resize();
    this.refs.headerLogbook.resize();
  }

  onPrevTap() {
    if (this._isExercice) return;

    this._tlPrevQuestion.play(0);
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
      this.$logbookAnswer.value = this._logbookAnswers.join('\n');
      this.model.question = '';
      this.model.btnlabel = 'Valider';
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
    this._point.complete = true;

    if (this._isExercice) {
      this.getReward();
      PupilApi.saveExercice(this.model.user, this.model.exerciceid);
      this.$el.querySelector('.exercice-container .line-header span').style.fontSize = '50px';
    } else {
      PupilApi.saveLogbookPage(this.model.user, {
        chapter: this.model.exercice.chapter.number - 1,
        subChapter: this._curStep,
        intro: this.resolvedData.logbook.intro,
        answer: this._logbookAnswers[this._logbookAnswers.length - 1].replace(/\n/g, '<br>')
      });
      this.model.subject = '';
      this.$el.querySelector('.logbook-container .line-header span').style.fontSize = '50px';
    }
  }

  getReward() {
    let rewardId = this.model.exercice.reward;

    if (this.model.user.rewards.indexOf(rewardId) !== -1) {
      // Pupil already get this reward
      return;
    }

    PupilApi.saveReward(this.model.user, rewardId);
    this.model.reward = RewardApi.findById(rewardId);
  }
}