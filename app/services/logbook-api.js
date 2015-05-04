'use strict';

import logbooks from 'data/logbook-pages.json';
import clone from 'clone';
import * as ChapterApi from 'services/chapter-api';

export function findById(id) {
  let page = clone(logbooks[id]);
  if (page) {
    page.chapter = ChapterApi.findById(page.chapter);
  }

  return page;
}