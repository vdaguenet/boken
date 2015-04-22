'use strict';

import poly from 'babel/polyfill'

import domready from 'domready';
import gsap from 'gsap';
import {verbose} from 'config';

/*
  Layouts
 */
import Header from 'layouts/header/Header';
import Sidebar from 'layouts/sidebar/Sidebar';

/*
  Sections
 */
import MainSection from 'sections/main/MainSection.js';

var app = new MainSection();

domready(() => {
  /*
    Layouts
   */
  Header.appendTo(document.querySelector('header'));
  Sidebar.appendTo(document.querySelector('.sidebar'));

  /*
    Sections
   */
  app.appendTo(document.querySelector('#view'));

  Header.on('menu:open', () => {
    Sidebar.open();
  });
});
