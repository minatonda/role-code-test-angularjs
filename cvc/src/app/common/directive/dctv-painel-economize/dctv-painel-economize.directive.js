(function () {
    'use strict';

    angular.module('dctv-painel-economize.directive', [])
        .directive('dctvPainelEconomize', dctvPainelEconomize);

    /** @ngInject */
    function dctvPainelEconomize() {

        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-painel-economize/dctv-painel-economize.tpl.html',
            link: function (scope, element, attrs) {

            }
        }

    }


})
();
