'use strict';

import chapters from 'data/chapters.json';
import clone from 'clone';

export function findById(id) {
  return clone(chapters[id]);
};

export function findAll () {
  return chapters;
}
