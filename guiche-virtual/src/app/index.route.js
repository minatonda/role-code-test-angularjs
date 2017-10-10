(function () {
    'use strict';

    angular
        .module('front-end')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                views: {
                    'navbar': {
                        templateUrl: 'app/components/layout/navbar/navbar.tpl.html',
                        controller: 'NavbarController',
                        controllerAs: 'vm'
                    },
                    'icones-rapidos': {
                        templateUrl: 'app/components/layout/icones-rapidos/icones-rapidos.tpl.html',
                        controller: 'IconesRapidosController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();
