var islandApi = require('./island-api');
var Q = require('q');

module.exports = {
  findAll: function() {
    var deferred = Q.defer();
    Q.all([islandApi.find(0), islandApi.find(1)]).then(function(values) {
      deferred.resolve([
        {
          name: 'Module test',
          island: values[0],
          locked: false
        },
        {
          name: 'Module test 2',
          island: values[1],
          locked: true
        }
      ]);
    });
    return deferred.promise;
  },
  find: function(id) {
    var deferred = Q.defer();
    islandApi.find(0).then(function(island) {
      deferred.resolve({
        name: 'Module test',
        island: island,
        locked: false
      });
    });
    return deferred.promise;
  }
};
