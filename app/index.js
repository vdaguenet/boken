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

app.on('sidebar:close', () => {
  Sidebar.close();
});

Header.on('menu:open', () => {
  Sidebar.open();
  app.greyifyMap();
});

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
});
