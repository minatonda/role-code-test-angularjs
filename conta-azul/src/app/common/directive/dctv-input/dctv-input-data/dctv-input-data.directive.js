(function () {
    'use strict';

    angular.module('dctv-input-data.directive', [])
        .directive('dctvInputData', dctvInputData);

    /** @ngInject */
    function dctvInputData($state) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                rangeMin: '=',
                rangeMax: '=',
                modeloInicio: '=',
                modeloFim: '=',
                modelo: '=',
                range: '=',
                exibirIcone: '=',
                saidaString: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-input/dctv-input-data/dctv-input-data.tpl.html',
            link: function (scope, element, attrs) {

                scope.eExibirPopupData = false;
                scope.alternarExibicaoPopupData = alternarExibicaoPopupData;

                function alternarExibicaoPopupData() {
                    scope.eExibirPopupData = !scope.eExibirPopupData;
                }

                function eExibirPopupData() {
                    return _exibicaoPopupData
                }

            }
        }

    }


})();
