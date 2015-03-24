'use strict';

import domready from 'domready';
import gsap from 'gsap';
import {verbose} from 'config';
import router from 'brindille-router';

/*
  Layouts
 */
import Footer from 'layouts/footer/footer';

/*
  Sections
 */
import Home from 'sections/home/home';
import CollectiveExercice from 'sections/collective-exercice/collective-exercice';

domready(() => {
  /*
    Layouts
   */
  Footer.appendTo(document.querySelector('footer'));

  /*
    Routing
   */
  router.init({
    el: document.querySelector('#view'),
    debug: verbose,
    hashbang: false,
    routes: {
      '/': {
        section: Home,
        title: 'Brindille - Home',
        description: 'Welcome to Brindille',
        transitionMode: router.TRANSITION_OUT_AND_AFTER_IN
      },
      '/collective': {
        section: CollectiveExercice,
        title: 'Exercice collectif',
        description: 'Welcome to Brindille',
        transitionMode: router.TRANSITION_OUT_AND_AFTER_IN
      }
    }
  });
});
