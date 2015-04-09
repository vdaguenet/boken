'use strict';

import domready from 'domready';
import gsap from 'gsap';
import {verbose} from 'config';

/*
  Layouts
 */
import Footer from 'layouts/footer/footer';

/*
  Sections
 */
import MainSection from 'sections/main';

var app = new MainSection();

domready(() => {
  /*
    Layouts
   */
  // Footer.appendTo(document.querySelector('footer'));

  /*
    Sections
   */
  app.appendTo(document.querySelector('#view'));
});
