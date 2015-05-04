'use strict';

import View from 'brindille-view';
import preloader from 'brindille-preloader';
import * as PupilApi from 'services/pupil-api';

import InteractiveMap from 'components/interactive-map/InteractiveMap';
import Exercice from 'components/exercice/Exercice';

import template from './main.html';

export default class MainSection extends View {
  constructor() {
    super({
      template: template,
      model: {
        user: {},
        exerciceid: -1,
        logbookid: -1
      },
      compose: {
        'interactive-map': InteractiveMap,
        'exercice': Exercice
      },
      resolve: {}
    });

    if (!window.localStorage.getItem('user')) {
      this.connectUser();
    }
    this.model.user = PupilApi.findByLogin(window.localStorage.getItem('user'));
    this.refs.map.on('exercice:open', data => {
      this.model.exerciceid = data.exerciceId;
      this.model.logbookid = data.logbookId;
      this.refs.exercice.open();
    });
    this.refs.exercice.on('close', () => {
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
