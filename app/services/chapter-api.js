'use strict';

import chapter from 'data/chapters.json';

export function findById(id) {
  return chapter[id];
};

export function findAll () {
  return chapter;
}
