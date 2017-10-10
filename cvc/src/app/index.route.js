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

                }
            })
            .state('app.home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/view/main/main.tpl.html',
                        controller: 'MainController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();
