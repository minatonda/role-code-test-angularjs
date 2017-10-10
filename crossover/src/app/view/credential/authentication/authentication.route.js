(function () {
    'use strict';

    angular
        .module('credential.authentication')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('credential.authentication', {
                url: '/authentication',
                views: {
                    '@': {

                        templateUrl: 'app/view/credential/authentication/authentication.tpl.html',
                        controller: 'AuthenticationController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();
