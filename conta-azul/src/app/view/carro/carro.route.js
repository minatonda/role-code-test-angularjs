(function () {
    'use strict';

    angular
        .module('carro')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('app.carro', {
                url: '/carro',
                abstract: true,
                views: {

                }
            });
    }

})();
