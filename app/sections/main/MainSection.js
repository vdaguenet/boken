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

    if (!window.localStorage.getItem('user')) {
      this.connectUser();
    }
  }

  ready() {
    this.refs.map.on('exercice:open', data => {
      this.refs.exercice.open(data.id);
    });
    this.refs.exercice.on('exercice:success', () => {
      this.refs.map.showNextExercice();
    });
  }

  destroying() {
    this.refs.map.off();
  }

  connectUser() {
    // TODO: create a login page, check if the user is in database and then store his login in localStorage
    window.localStorage.setItem('user', 'test');
  }
}
