(function() {
    'use strict';

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('pedido', {
                url: '/pedido'
            });

        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('view.pedido')
        .config(routerConfig);

})();