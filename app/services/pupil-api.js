'use strict';

import pupils from 'data/pupils.json';

export function findByLogin(login) {
  for(let p of pupils) {
    if(p.login === login) return p;
  }
}

export function findLogbookPagesByChapter(pupil, chapterId) {
  return pupil.logbookPages.filter(item => item.chapter === chapterId);
}

export function saveLogbookPage (pupil, page) {
  saveStep(pupil, page.subChapter);
  pupil.logbookPages.push(page);
}

export function saveReward (pupil, rewardId) {
  pupil.rewards.push(rewardId);
}

export function saveExercice (pupil, exerciceId) {
  pupil.exercicesAchieved.push(exerciceId);
}

function saveStep (pupil, step) {
  pupil.chaptersDiscovered[pupil.chaptersDiscovered.length - 1].push(step)
}