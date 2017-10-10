(function () {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('usuario.detalhe', {
                url: '/detalhe/:ID',
                views: {
                    '@': {
                        templateUrl: 'app/view/usuario/usuario-detalhe/usuario-detalhe.tpl.html',
                        controller: 'UsuarioDetalheController as controller',
                    }
                }
            });
    }

    angular
        .module('usuario-detalhe')
        .config(routerConfig);

})();