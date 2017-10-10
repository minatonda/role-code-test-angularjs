(function () {
  'use strict';

  angular.module('user.factory', [])
    .factory('UserFactory', UserFactory);

  /** @ngInject */
  function UserFactory(API, $http) {

    var _factory = function (data) {
      angular.extend(this, data);
    };

    var _urlSufix = 'user';
    var _url = function (nomeMetodo) {
      return API.URL + '/' + _urlSufixo + '/' + nomeMetodo;
    };

    return _factory;
  }

})();
