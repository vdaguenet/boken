'use strict';

var Q = require('q');

// TODO: Connect with database
const imagesTest = [
  {
    x: 0,
    y: 0,
    width: 120,
    height: 238,
    image: '../assets/images/map/ile3.png'
  },
  {
    x: 370,
    y: 279,
    width: 120,
    height: 238,
    image: '../assets/images/map/ile4.png'
  }
];

export function findAll() {
  var deferred = Q.defer();
  deferred.resolve(imagesTest);

  return deferred.promise;
}

export function find(id) {
  var deferred = Q.defer();
  deferred.resolve(imagesTest[id]);

  return deferred.promise;
}
