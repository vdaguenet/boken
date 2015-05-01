'use strict';

import View from 'brindille-view';
import {on, off} from 'dom-event';
import nextTick from 'just-next-tick';

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
        user: {}
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
    this._prevChapter = {};
    this._nextChapter = {};
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
    // FOR TEST ONLY
    this.model.page = this.model.user.logbookPages[0];
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
    TweenMax.to(this.$parentEl, 0.6, {xPercent: -100});
    this._currentTab.transitionIn();
  }

  close() {
    this._currentTab.transitionOut();
    TweenMax.to(this.$parentEl, 0.6, {xPercent: 0});
  }

  onPassportClick() {
    this._currentTab.transitionOut();
    this._currentTab = this.refs.passportGrid;
    this._currentTab.transitionIn();
  }

  onChestClick() {
    this._currentTab.transitionOut();
    this._currentTab = this.refs.chestGrid;
    this._currentTab.transitionIn();
  }

  onLogbookClick() {
    this._currentTab.transitionOut();
    this._currentTab = this.refs.logbookPage;
    this._currentTab.transitionIn();
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
