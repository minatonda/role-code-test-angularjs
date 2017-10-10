(function () {
  'use strict';

  angular.module('state.service', [])
    .service('StateService', StateService);

  /** @ngInject */
  function StateService(localStorageService, lodash) {

    var service = this;

  }

})();
