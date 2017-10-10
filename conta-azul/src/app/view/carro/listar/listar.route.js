(function () {
  'use strict';

  angular
    .module('carro.listar')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.carro.listar', {
        url: '/listar',
        views: {
          '@': {
            templateUrl: 'app/view/carro/listar/listar.tpl.html',
            controller: 'CarroListarController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
