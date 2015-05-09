'use strict';

import exercices from 'data/exercices.json';
import points from 'data/points.json';
import clone from 'clone';
import * as ChapterApi from 'services/chapter-api';

export function findById(id) {
  let ex = clone(exercices[id]);
  if (ex) {
    ex.chapter = ChapterApi.findById(exercices[id].chapter);
  }

  return ex;
}

export function getPoints () {
  return points;
}

export function findByExerciceAndLogbookId (exerciceId, logbookId) {
  return points.filter(item => item.exerciceId === exerciceId && item.logbookPageId === logbookId)[0];
}