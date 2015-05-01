'use strict';

import exercices from 'data/exercices.json';
import * as ChapterApi from 'services/chapter-api';

export function findById(id) {
  let ex = exercices[id];
  if (ex) {
    ex.chapter = ChapterApi.findById(exercices[id].chapter);
  }

  return ex;
}