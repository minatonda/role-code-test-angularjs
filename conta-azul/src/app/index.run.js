(function () {
    'use strict';

    angular
        .module('front-end')
        .run(RouteManager)
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, toastr, DadosGerenciamentoService) {
        $rootScope.toastr = toastr;
        
        $rootScope.middleHeight = function () {
            return angular.element(window).outerHeight() - angular.element('#layout-head').outerHeight();
        };
        $rootScope.mobile = function () {
            return !(angular.element(window).outerWidth() > 991);
        };
        
        DadosGerenciamentoService.sincronizarDados();
    }

    /** @ngInject */
    function RouteManager($state, $rootScope, toastr) {

    }

})();
