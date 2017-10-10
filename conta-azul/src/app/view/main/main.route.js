(function () {
    'use strict';

    angular
        .module('main')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.main', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/view/main/main.tpl.html',
                        controller: 'MainController',
                        controllerAs: 'vm'
                    }
                }
            });

    }

})();
