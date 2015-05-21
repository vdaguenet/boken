'use strict';

import View from 'brindille-view';
import defaults from 'defaults';
import resize from 'brindille-resize';
import classes from 'dom-classes';

import template from './sort-question.html';

export default class SortQuestion extends View {
  constructor(model) {
    super({
      template: template,
      resolve: {},
      model: defaults(model, {
        question: {},
        columnLeftTitle: '',
        columnRightTitle: '',
        proposals: []
      }),
      compose: {}
    });

    this.pupilAnswers = {};
    this._placeholdersLeft = this.$el.querySelectorAll('.column.left .placeholder');
    this._placeholdersRight = this.$el.querySelectorAll('.column.right .placeholder');
  }

  reset() {
    this.pupilAnswers = {};
    this.model.proposals = [];

    for (let pl of this._placeholdersLeft) {
      classes.remove(pl, 'filled');
    }

    for (let pr of this._placeholdersRight) {
      classes.remove(pr, 'filled');
    }
  }

  getPupilAnswers() {
    return this.pupilAnswers;
  }

  hide() {
    this.$el.style.display = 'none';
  }

  show() {
    this.model.proposals = [];
    this.$el.style.display = '';

    this.model.columnLeftTitle = this.model.question.sentences[0].answer;
    for (let sentence of this.model.question.sentences) {
      if (sentence.answer !== this.model.columnLeftTitle) {
        this.model.columnRightTitle = sentence.answer;
      }

      this.model.proposals.push(sentence.subject);
    }

    let self = this;

    Draggable.create('.proposal', {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: '.exercice .content',
      onDragStart: function () {
        let $bbox = this.target.getBoundingClientRect();
        let placeholders;

        TweenMax.to(this.target.querySelector('.background'), 0.3, {scaleX: 1});
        TweenMax.to(this.target, 0.6, {scale: 1.5, ease: Expo.easeOut});

        if (($bbox.left + 0.5 * $bbox.width) > 0.5 * resize.width) {
          placeholders = self._placeholdersRight;
        } else {
          placeholders = self._placeholdersLeft;
        }

        if (this.target.getAttribute('placeholder-id')) {
          classes.remove(placeholders[this.target.getAttribute('placeholder-id')], 'filled');
        }
      },
      onRelease: function () {
        TweenMax.to(this.target, 0.5, {scale: 1, ease: Cubic.easeOut, onComplete: () => {
          if (this.target._gsTransform.y > -60) return;

          let $bbox = this.target.getBoundingClientRect();
          let placeholders;
          let count = 0;
          let answer = '';

          if (($bbox.left + 0.5 * $bbox.width) > 0.5 * resize.width) {
            placeholders = self._placeholdersRight;
            answer = self.model.columnRightTitle;
          } else {
            placeholders = self._placeholdersLeft;
            answer = self.model.columnLeftTitle;
          }

          for (let placeholder of placeholders) {
            if (!classes.has(placeholder, 'filled')) {
              let bbPlaceholder = placeholder.getBoundingClientRect();
              let targetX = $bbox.left - bbPlaceholder.left + 0.5 * $bbox.width;
              let targetY = $bbox.top - bbPlaceholder.top;
              let scale = bbPlaceholder.width / $bbox.width;

              TweenMax.to(this.target, 0.3, {x: this.target._gsTransform.x - targetX + 0.5 * bbPlaceholder.width, y: this.target._gsTransform.y - targetY});
              TweenMax.to(this.target.querySelector('.background'), 0.3, {scaleX: scale});

              classes.add(placeholder, 'filled');

              self.pupilAnswers[this.target.innerText.toLowerCase()] = answer;

              this.target.setAttribute('placeholder-id', count);
              break;
            }

            count++;
          }
        }});
      }
    });
  }
}