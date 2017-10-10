(function () {
    'use strict';

    angular.module('dctv-lista-combo.directive', [])
        .directive('dctvListaCombo', dctvListaCombo);

    /** @ngInject */
    function dctvListaCombo(lodash, $filter) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                combos: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-lista-combo/dctv-lista-combo.tpl.html',
            link: function (scope, element, attrs) {

                scope.obterCombos = obterCombos;
                scope.obterComboValores = obterComboValores;
                scope.obterComboExibicaoValor = obterComboExibicaoValor;
                scope.eComboCarregando = eComboCarregando;
                scope.obterAoSelecionar = obterAoSelecionar;

                scope.$watchCollection(function () {
                    return obterCombos();
                }, function () {
                    angular.element(obterCombos()).each(function (iC, combo) {
                        if (combo.carregar && combo.buscarValores) {
                            buscarComboValores(combo);
                        }
                    });
                });

                function obterCombos() {
                    return scope.combos;
                };

                function obterComboValores(combo) {
                    return combo.valores;
                }

                function obterComboExibicaoValor(combo, valor) {
                    if (angular.isFunction(combo.valorExibicao)) {
                        return combo.valorExibicao(valor);
                    }
                    else {
                        return valor[combo.valorExibicao];
                    }
                };

                function obterAoSelecionar(combo) {
                    return combo.aoSelecionar ? combo.aoSelecionar : angular.noop;
                };

                function eComboCarregando(combo) {

                };

                function buscarComboValores(combo) {
                    combo.buscarValores().then(sucesso, erro);
                    function sucesso(sucesso) {
                        combo.valores = [];
                        for (var key in sucesso.valores) {
                            sucesso.valores[key].simbolo = key;
                            combo.valores.push(sucesso.valores[key]);
                        }
                        combo.carregar = false;
                    };

                    function erro(erro) {
                        combo.carregar = false;
                    };
                };

            }
        }

    }


})
();
