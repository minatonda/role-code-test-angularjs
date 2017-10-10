(function () {
  'use strict';

  angular.module('credential.service', [])
    .service('CredentialService', CredentialService);

  /** @ngInject */
  function CredentialService(localStorageService) {

    var _service = this;
    var _credential = null;

    _service.Autorize = function (username, sessionId) {
      _credential = {};
      _credential.sessionId = sessionId;
      _credential.username = username;
      localStorageService.set('credential', _credential);
    };

    _service.Unauthorize = function () {
      _credential = null;
      localStorageService.set('credential', null);
    };

    _service.IsAuthorized = function () {
      return _service.GetFromLocalStorage() ? true : false;
    };

    _service.GetFromLocalStorage = function () {
      return localStorageService.get('credential') ? localStorageService.get('credential') : '';
    };


  }

})();
