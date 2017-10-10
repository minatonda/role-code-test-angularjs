(function () {
  'use strict';

  angular
    .module('carro.adicionar-atualizar')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.carro.atualizar', {
        url: '/atualizar/:ID',
        views: {
          '@': {
            templateUrl: 'app/view/carro/adicionar-atualizar/adicionar-atualizar.tpl.html',
            controller: 'CarroAdicionarAtualizarController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
