(function () {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('pedido.lista', {
                url: '/lista',
                views: {
                    '@': {
                        templateUrl: 'app/view/pedido/pedido-lista/pedido-lista.tpl.html',
                        controller: 'PedidoListaController as controller'
                    }
                }
            });
    }

    angular
        .module('pedido-lista')
        .config(routerConfig);

})();