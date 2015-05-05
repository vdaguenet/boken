'use strict';

import polyfill from 'babel/polyfill';
import domready from 'domready';
import gsap from 'gsap';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';

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

  Sidebar.on('open', () => {
    app.greyifyMap();
  });

  Sidebar.on('close', () => {
    app.removeOverlay();
  });
});
