(function () {
    'use strict';

    angular
        .module('walmartTest')
        .run(runBlock)
        .run(runRoute);

    /** @ngInject */
    function runBlock($log) {
        $log.debug('runBlock end');
    }

    function runRoute($rootScope) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log(toState.name + " start");
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log(toState.name + " success");
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.error(error);
        });
    }

})();
