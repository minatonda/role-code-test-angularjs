(function () {
    'use strict';

    /** @ngInject */
    function UsuarioListaFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        return _factory;

    }

    angular.module('usuario-lista.factory', [])
        .factory('UsuarioListaFactory', UsuarioListaFactory);

})();