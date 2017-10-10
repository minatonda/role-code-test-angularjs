(function () {
    'use strict';

    /** @ngInject */
    function UsuarioDetalheFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        return _factory;

    }

    angular.module('usuario-detalhe.factory', [])
        .factory('UsuarioDetalheFactory', UsuarioDetalheFactory);

})();