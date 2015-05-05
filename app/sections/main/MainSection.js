'use strict';

import View from 'brindille-view';
import * as PupilApi from 'services/pupil-api';

import InteractiveMap from 'components/interactive-map/interactiveMap';
import Exercice from 'components/exercice/Exercice';
import PointsIndicator from 'components/points-indicator/PointsIndicator';

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
        'exercice': Exercice,
        'points-indicator': PointsIndicator
      },
      resolve: {}
    });

    if (!window.localStorage.getItem('user')) {
      this.connectUser();
    }
    this.model.user = PupilApi.findByLogin(window.localStorage.getItem('user'));
    this.refs.map.on('exercice:open', this.openExercice.bind(this));
    this.refs.map.on('sidebar:close', this.closeSidebar.bind(this));
    this.refs.exercice.on('close', this.closeExercice.bind(this));
    this.refs.exercice.on('indicator:update', (id) => {
      this.refs.indicator.update(id);
    });
  }

  greyifyMap() {
    this.refs.map.applyGreyFilter();
  }

  closeSidebar() {
    this.emit('sidebar:close');
  }

  closeExercice() {
    this.refs.indicator.hide();
    this.refs.map.showNextExercice();
  }

  openExercice(data) {
    this.refs.indicator.show();
    this.model.exerciceid = data.exerciceId;
    this.model.logbookid = data.logbookId;
    this.refs.exercice.open();
  }

  destroying() {
    this.refs.exercice.off();
    this.refs.map.off();
  }

  connectUser() {
    // TODO: create a login page, check if the user is in database and then store his login in localStorage
    window.localStorage.setItem('user', 'test');
  }
}
