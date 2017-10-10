(function () {
    'use strict';

    angular
        .module('walmartTest')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/index/index.tpl.html',
                controller: 'IndexController',
                controllerAs: 'controller'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
