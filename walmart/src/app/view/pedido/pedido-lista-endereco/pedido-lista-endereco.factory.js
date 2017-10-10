(function () {
    'use strict';

    /** @ngInject */
    function PedidoListaEnderecoFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        return _factory;

    }

    angular.module('pedido-lista-endereco.factory', [])
        .factory('PedidoListaEnderecoFactory', PedidoListaEnderecoFactory);

})();