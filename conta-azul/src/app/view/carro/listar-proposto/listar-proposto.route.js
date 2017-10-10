(function () {
  'use strict';

  angular
    .module('carro.listar-proposto')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.carro.listar-proposto', {
        url: '/listar-proposto',
        views: {
          '@': {
            templateUrl: 'app/view/carro/listar-proposto/listar-proposto.tpl.html',
            controller: 'CarroListarPropostoController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
