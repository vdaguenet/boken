'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';
import nextTick from 'just-next-tick';
import classes from 'dom-classes';

/*
  services
 */
import * as PupilApi from 'services/pupil-api';
import * as RewardApi from 'services/reward-api';
import * as ChapterApi from 'services/chapter-api';

/*
  template
 */
import template from './sidebar.html';

/*
  components
 */
import MenuButton from 'components/menu-button/MenuButton';
import ChapterHeader from 'components/chapter-header/ChapterHeader';
import LogbookPage from 'components/logbook-page/LogbookPage';
import PrevNextButton from 'components/prev-next-button/PrevNextButton';
import ChestGrid from 'components/chest-grid/ChestGrid';
import PassportGrid from 'components/passport-grid/PassportGrid';

class Sidebar extends View {
  constructor() {
    super({
      template: template,
      model: {
        chapter: {},
        subchapter: {},
        user: {},
        page: {}
      },
      compose: {
        'menu-button': MenuButton,
        'chapter-header': ChapterHeader,
        'prev-next-button': PrevNextButton,
        'logbook-page': LogbookPage,
        'chest-grid': ChestGrid,
        'passport-grid': PassportGrid
      },
      resolve: {
        user: PupilApi.findByLogin(window.localStorage.getItem('user')),
        rewards: RewardApi.findAll(),
        chapters: ChapterApi.findAll()
      }
    });
    this._currentTab = this.refs.passportGrid;
    classes.add(this.refs.passportBtn.$el, 'selected');
    this._prevChapter = {};
    this._nextChapter = {};
    this._logbookPages = [];
    this._curStep = 0;
    this.addEvents();
  }

  ready() {
    nextTick(() => {
      this.refs.passportGrid.$el.style.display = 'none';
      this.refs.chestGrid.$el.style.display = 'none';
      this.refs.logbookPage.$el.style.display = 'none';
    });
  }

  resolved() {
    this._userRewards = [];
    this._userChapters = [];

    for (var i = 0, l = this.resolvedData.user.rewards.length; i < l; i++) {
      this._userRewards.push(this.resolvedData.rewards[this.resolvedData.user.rewards[i]]);
    }
    for (var i = 0, l = this.resolvedData.user.chaptersDiscovered.length; i < l; i++) {
      if (this.resolvedData.chapters[i]) {
        this._userChapters.push(this.resolvedData.chapters[i]);
      }
    }

    this.model.chapter = this._userChapters[this._userChapters.length - 1];
    this.model.user = this.resolvedData.user;

    this.setPrevNextChapters();
    this.setLogbookPage();
  }

  addEvents() {
    on(this.refs.passportBtn.$el, 'touchend', this.onPassportClick.bind(this));
    on(this.refs.chestBtn.$el, 'touchend', this.onChestClick.bind(this));
    on(this.refs.logbookBtn.$el, 'touchend', this.onLogbookClick.bind(this));
    this.refs.prevNextButton.on('previous', this.gotoPreviousChapter.bind(this));
    this.refs.prevNextButton.on('next', this.gotoNextChapter.bind(this));
  }

  setLogbookPage() {
    this._logbookPages = PupilApi.findLogbookPagesByChapter(this.model.user, this.model.chapter.number - 1);
    this._curStep = this._logbookPages.length - 1;
    this.refs.logbookPage.model.current = this._curStep + 1;
    this.refs.logbookPage.model.maxpages = this._logbookPages.length;
    this.model.page = this._logbookPages[this._curStep];
    this.model.subchapter = this.resolvedData.chapters[this.model.page.chapter].subChapters[this.model.page.subChapter];
  }

  setPrevNextChapters() {
    let currentChapterIndex = 0;

    for (let i = 0, l = this._userChapters.length; i < l; i++) {
      if (this._userChapters[i].number === this.model.chapter.number) {
        currentChapterIndex = i;
        break;
      }
    }

    if (this._userChapters[currentChapterIndex - 1]) {
      this._prevChapter = this._userChapters[currentChapterIndex - 1];
      this.refs.prevNextButton.refs.previous.$el.style.display = '';
      this.refs.prevNextButton.model.prevlabel = 'Chapitre ' + this._prevChapter.number;
    } else {
      this.refs.prevNextButton.refs.previous.$el.style.display = 'none';
    }

    if (this._userChapters[currentChapterIndex + 1]) {
      this._nextChapter = this._userChapters[currentChapterIndex + 1];
      this.refs.prevNextButton.refs.next.$el.style.display = '';
      this.refs.prevNextButton.model.nextlabel = 'Chapitre ' + this._nextChapter.number;
    } else {
      this.refs.prevNextButton.refs.next.$el.style.display = 'none';
    }

    this.refs.chestGrid.initGrid(this.resolvedData.rewards);
    this.refs.passportGrid.initGrid();
  }

  gotoPreviousChapter() {
    this.model.chapter = this._prevChapter;
    this.setPrevNextChapters();
    this.setLogbookPage();
  }

  gotoNextChapter() {
    this.model.chapter = this._nextChapter;
    this.setPrevNextChapters();
    this.setLogbookPage();
  }

  open() {
    let tl = new TimelineMax();

    this.resolved();
    this.emit('open');

    tl.to(this.$parentEl, 0.6, {xPercent: -100}, 0);
    tl.staggerFromTo(this.$el.querySelectorAll('.menu-button .picto'), 0.6, {scale: 0}, {scale: 1, ease: Expo.easeInOut}, 0.08, 0.1);
    tl.staggerFromTo(this.$el.querySelectorAll('.menu-button p'), 0.5, {alpha: 0, y: 20}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.08, 0.4);
    tl.fromTo(this.$el.querySelector('.chapter-header .header'), 0.9, {scale: 0}, {scale: 1, ease: Expo.easeOut}, 0.7);
    tl.staggerFromTo(this.$el.querySelectorAll('.chapter-header .header, .chapter-header h1'), 0.7, {y: 50, alpha: 0}, {y: 0, alpha: 1, ease: Expo.easeInOut}, 0.08, 0.5);
    tl.call(() => {
      this._currentTab.transitionIn();
    }, null, null, 0.7);
    tl.fromTo(this.$el.querySelector('.prev-next-button'), 0.6, {alpha: 0, y: 50}, {alpha: 1, y: 0, ease: Expo.easeInOut}, 0.9);
  }

  close() {
    this._currentTab.transitionOut();
    TweenMax.to(this.$parentEl, 0.6, {xPercent: 0});
  }

  onPassportClick() {
    classes.remove(this.$el.querySelector('.menu-button.selected'), 'selected');
    classes.add(this.refs.passportBtn.$el, 'selected');
    let oldTab = this._currentTab;
    this._currentTab = this.refs.passportGrid;
    oldTab.transitionOut(() => {
      this._currentTab.transitionIn();
    });
  }

  onChestClick() {
    classes.remove(this.$el.querySelector('.menu-button.selected'), 'selected');
    classes.add(this.refs.chestBtn.$el, 'selected');
    let oldTab = this._currentTab;
    this._currentTab = this.refs.chestGrid;
    oldTab.transitionOut(() => {
      this._currentTab.transitionIn();
    });
  }

  onLogbookClick() {
    classes.remove(this.$el.querySelector('.menu-button.selected'), 'selected');
    classes.add(this.refs.logbookBtn.$el, 'selected');
    let oldTab = this._currentTab;
    this._currentTab = this.refs.logbookPage;
    oldTab.transitionOut(() => {
      this._currentTab.transitionIn();
    });

  }

  destroying() {
    off(this.refs.passportBtn.$el, 'touchend', this.onPassportClick.bind(this));
    off(this.refs.chestBtn.$el, 'touchend', this.onChestClick.bind(this));
    off(this.refs.logbookBtn.$el, 'touchend', this.onLogbookClick.bind(this));
    this.refs.prevNextButton.off('previous', this.gotoPreviousChapter.bind(this));
    this.refs.prevNextButton.off('next', this.gotoNextChapter.bind(this));
  }

}

export default new Sidebar();
