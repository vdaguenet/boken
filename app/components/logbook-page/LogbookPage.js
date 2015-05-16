'use strict';

import defaults from 'defaults';
import View from 'brindille-view';
import PageNumbers from 'components/page-numbers/PageNumbers';
import template from './logbook-page.html';

export default class LogbookPage extends View {
  constructor(model) {
    super({
      template: template,
      model: defaults(model, {
        page: {},
        subchapter: {},
        current: 0,
        maxpages: 0
      }),
      compose: {
        'page-numbers': PageNumbers
      },
      resolve: {}
    });
  }

  ready() {

  }

  destroying() {

  }

  transitionOut(callback) {
    let $els = this.$el.querySelectorAll('img, .title h1, .title p, .content, .page-numbers');
    let tl = new TimelineMax({
      onComplete: callback
    });
    tl.staggerTo($els, 0.7, {alpha: 0, y: 100, ease: Expo.easeInOut}, -0.08, 0);
    tl.set(this.$el, {display: 'none'}, 0.7);
  }

  transitionIn() {
    let $els = this.$el.querySelectorAll('.title h1, .title p, .content, .page-numbers');
    let $lineLeft = this.$el.querySelector('.line.left');
    let $lineRight = this.$el.querySelector('.line.right');
    let $img = this.$el.querySelector('img');
    let tl = new TimelineMax();
    tl.set(this.$el, {display: ''}, 0);
    tl.staggerFromTo($els, 0.9, {alpha: 0, y: 100}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 0);
    tl.fromTo($img, 0.7, {y: 0, alpha: 0, scale: 2}, {y: 0, alpha: 1, scale: 1, ease: Expo.easeInOut}, 0.4);
    tl.fromTo($lineLeft, 0.7, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.7);
    tl.fromTo($lineRight, 0.7, {scaleX: 0}, {scaleX: 1, ease: Expo.easeInOut}, 0.7);
  }

}
