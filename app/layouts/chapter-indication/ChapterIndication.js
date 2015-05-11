'use strict';

import View from 'brindille-view';

import ChapterHeader from 'components/chapter-header/ChapterHeader';

import template from './chapter-indication.html';

class ChapterIndication extends View {
  constructor() {
    super({
      template: template,
      model: {
        chapter: {
          number: 3,
          title: 'La tempête<br>est effroyable'
        }
      },
      compose: {
        'chapter-header': ChapterHeader
      },
      resolve: {}
    });

    let $container = document.querySelector('.indicator-container');

    this.tlShow = new TimelineMax({
      paused: true
    });
    this.tlShow.fromTo($container, 0.1, {zIndex: -1}, {zIndex: 1}, 0);
    this.tlShow.fromTo(this.$el, 0.4, {y: 100, alpha: 0}, {y: 0, alpha: 1, ease: Expo.easeInOut}, 0);
    this.tlShow.staggerFromTo(this.$el.querySelectorAll('.header, .chapter-header h1'), 0.6, {y: 100, alpha: 0}, {y: 0, alpha: 1, ease: Expo.easeOut}, 0.08, 0.2);
    this.tlShow.pause(0);
  }

  show() {
    this.tlShow.play(0);

    setTimeout(() => {
      this.hide();
    }, 5000);
  }

  hide() {
    this.tlShow.reverse();
  }
}

export default new ChapterIndication();