'use strict';

import pupils from 'data/pupils.json';

export function findByLogin(login) {
  for(let p of pupils) {
    if(p.login === login) return p;
  }
}

export function saveLogbookPage (pupil, page) {
  pupil.logbookPages.push(page);
}