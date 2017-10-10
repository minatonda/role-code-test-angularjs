(function () {
    'use strict';

    /** @ngInject */
    function PedidoListaFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        return _factory;

    }

    angular.module('pedido-lista.factory', [])
        .factory('PedidoListaFactory', PedidoListaFactory);

})();