(function () {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('pedido.lista.endereco', {
                url: '/endereco',
                views: {
                    '@': {
                        templateUrl: 'app/view/pedido/pedido-lista-endereco/pedido-lista-endereco.tpl.html',
                        controller: 'PedidoListaEnderecoController as controller'
                    }
                }
            });
    }

    angular
        .module('pedido-lista-endereco')
        .config(routerConfig);

})();