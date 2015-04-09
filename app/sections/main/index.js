'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import resizeUtil from 'brindille-resize';
import scrollUtil from 'brindille-scroll';

import InteractiveMap from 'components/interactive-map/InteractiveMap';
import Exercice from 'components/exercice/Exercice';

import template from './main.html';

export default class MainSection extends View {
  constructor() {
    super({
      template: template,
      model: {},
      compose: {
        'interactive-map': InteractiveMap,
        'exercice': Exercice
      },
      resolve: {}
    });
  }

  ready() {
    this.refs.map.on('exercice:open', data => {
      this.refs.exercice.open(data.id);
    });
    this.refs.exercice.on('exercice:close', () => {
      this.refs.map.closeExercice();
    });
  }

  destroying() {
    this.refs.map.off();
  }
}
