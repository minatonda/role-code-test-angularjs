(function() {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('usuario', {
                url: '/usuario'
            });

        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('view.usuario')
        .config(routerConfig);

})();