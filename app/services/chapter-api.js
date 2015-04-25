'use strict';

import chapters from 'data/chapters.json';

export function findById(id) {
  return chapters[id];
};

export function findAll () {
  return chapters;
}
