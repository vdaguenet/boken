'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import PIXI from 'pixi.js';
import raf from 'raf';
import shuffle from 'shuffle-array';
import {isInCircle} from 'utils';

import template from './link-question.html';

export default class LinkQuestion extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        question: {},
        subjects: [],
        answers: []
      }),
      compose: {}
    });

    this._firstColumnX = 222;
    this._firstRowY = 40;
    this._rowSpacing = 75;
    this._pointRadius = 12;

    this._sentencePoints = [];
    this._answerPoints = [];

    this._curSubject = '';
    this.pupilAnswers = {};

    this.lineFrom = undefined;
    this.lineTo = undefined;

    this.renderer = PIXI.autoDetectRenderer(800, 600, {
      transparent: true,
      view: this.$el.querySelector('#renderer'),
      resolution: 1,
      antialias: true,
      forceFXAA: true
    });

    this.stage = new PIXI.Container();

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = true;

    this.graphics.touchstart = this.onTouchstart.bind(this);
    this.graphics.touchmove = this.onTouchmove.bind(this);
    this.graphics.touchend = this.onTouchend.bind(this);
    this.graphics.touchendoutside = this.onTouchend.bind(this);
  }

  reset() {
    this.model.question = {};
    this.model.subjects = [];
    this.model.answers = [];
    this._sentencePoints = [];
    this._answerPoints = [];

    this._curSubject = '';
    this.pupilAnswers = {};

    this.stage.removeChildren();

    this.graphics.clear();
  }

  onTouchstart(e) {
    let i = 0;
    for (let p of this._sentencePoints) {
      if (isInCircle(e.data.global.x, e.data.global.y, p.x, p.y, this._pointRadius)) {
        this._curSubject = this.model.subjects[i];
        this.pupilAnswers[this._curSubject] = '';
      }
      i++;
    }
  }

  onTouchmove(e) {
    this.lineFrom = this.lineTo;
    this.lineTo = {
      x: e.data.global.x,
      y: e.data.global.y
    };
    if (this.lineFrom && this.lineTo) {
      this.drawLine();
    }
  }

  onTouchend(e) {
    let i = 0;
    for (let p of this._answerPoints) {
      if (isInCircle(e.data.global.x, e.data.global.y, p.x, p.y, this._pointRadius)) {
        this.pupilAnswers[this._curSubject] = this.model.answers[i];
      }
      i++;
    }

    this.lineFrom = null;
    this.lineTo = null;
  }

  ready() {}

  getPupilAnswers() {
    return this.pupilAnswers;
  }

  animate() {
    this.renderer.render(this.stage);

    raf(this.animate.bind(this));
  }

  draw() {
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0x605337, 1.0);
    for (let i in this.model.question.sentences) {
      this.graphics.drawCircle(this._firstColumnX, this._firstRowY + this._rowSpacing * i, this._pointRadius);
      this._sentencePoints.push({
        x: this._firstColumnX,
        y: this._firstRowY + this._rowSpacing * i
      });
      this.graphics.drawCircle(this._firstColumnX + 180, this._firstRowY + this._rowSpacing * i, this._pointRadius);
      this._answerPoints.push({
        x: this._firstColumnX + 180,
        y: this._firstRowY + this._rowSpacing * i
      });
    }
    this.graphics.endFill();

    this.stage.addChild(this.graphics);
  }

  drawLine() {
    this.graphics.lineStyle(2, 0x605337, 1);
    this.graphics.moveTo(this.lineFrom.x, this.lineFrom.y);
    this.graphics.lineTo(this.lineTo.x, this.lineTo.y);
    this.graphics.endFill();
  }

  hide() {
    this.$el.style.display = 'none';
  }

  show() {
    this.graphics.clear();
    this.$el.style.display = '';
    let answersTmp = [];
    this.model.subjects = [];
    for (let a of this.model.question.sentences) {
      this.model.subjects.push(a.subject);
      answersTmp.push(a.answer);
    }
    shuffle(answersTmp);
    this.model.answers = []; // to force rivets update the view
    this.model.answers = answersTmp;

    this.renderer.resize(this.$el.offsetWidth, 320);
    this.draw();

    raf(this.animate.bind(this));
  }
}