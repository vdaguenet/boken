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
import ChapterIndication from 'layouts/chapter-indication/ChapterIndication';

/*
  Sections
 */
import MainSection from 'sections/main/MainSection.js';
const app = new MainSection();

app.on('sidebar:close', () => {
  Sidebar.close();
});

app.on('exercice:open', () => {
  Header.toggleButton();
});

app.on('exercice:close', () => {
  Header.toggleButton();
});

app.on('chapterIndication:show', () => {
  ChapterIndication.show();
});

Header.on('menu:open', () => {
  Sidebar.open();
  app.greyifyMap();
});

Header.on('exercice:close', () => {
  app.refs.exercice.close();
});

domready(() => {
  /*
    Layouts
   */
  Header.appendTo(document.querySelector('header'));
  Sidebar.appendTo(document.querySelector('.sidebar'));
  ChapterIndication.appendTo(document.querySelector('.indicator-container'));

  /*
    Sections
   */
  app.appendTo(document.querySelector('#view'));

  setTimeout(() => {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
    app.refs.map.transitionIn();
  }, 2000);
});
