(function () {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('usuario.lista', {
                url: '/lista',
                views: {
                    '@': {
                        templateUrl: 'app/view/usuario/usuario-lista/usuario-lista.tpl.html',
                        controller: 'UsuarioListaController as controller',
                    }
                }
            });
    }

    angular
        .module('usuario-lista')
        .config(routerConfig);

})();