(function () {
  'use strict';

  angular.module('credential.factory', [])
    .factory('CredentialFactory', CredentialFactory);

  /** @ngInject */
  function CredentialFactory(API, $http, CredentialService, md5) {

    var _factory = function (data) {
      angular.extend(this, data);
    };

    var _urlSufix = 'user';
    var getUrl = function (nameMethod) {
      return API.URL + '/' + _urlSufix + '/' + nameMethod;
    };

    _factory.logIn = function (model) {
      var tempModel = angular.copy(model);
      tempModel.password = md5.createHash(tempModel.password || '');

      return $http.post(getUrl('auth'), tempModel).success(function (response) {
        CredentialService.Autorize(response.username, response.sessionId);
        return response;
      }).error(function (error) {
        return error;
      });
    };

    _factory.logOut = function (model) {
      return $http.get(getUrl('logout?sessionId=' + model.sessionId)).success(function (response) {
        CredentialService.Unauthorize();
        return response;
      }).error(function (error) {
        return error;
      });
    };

    _factory.Register = function () {

    }

    return _factory;
  }

})();
