'use strict';

import pupils from 'data/pupils.json';

export function findByLogin(login) {
  for(let p of pupils) {
    if(p.login === login) return p;
  }
}

