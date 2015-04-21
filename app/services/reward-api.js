'use strict';

import rewards from 'data/rewards.json';

export function findById(id) {
  return rewards[id];
}

export function findAll() {
  return rewards;
}