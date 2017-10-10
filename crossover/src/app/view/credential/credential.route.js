(function() {
  'use strict';

  angular
    .module('credential')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('credential', {
        url: '/credential'
      });
  }

})();
