(function () {
    'use strict';

    angular.module('dctv-ordenador.directive', [])
        .directive('dctvOrdenador', dctvOrdenador);

    /** @ngInject */
    function dctvOrdenador(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                ordenacoes: '=',
                aoProcessarLista: '=',
                spanControladores: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-ordenador/dctv-ordenador.tpl.html',
            link: function (scope, element, attrs) {

                scope.obterGridSpan = obterGridSpan;
                scope.obterOrdenacoes = obterOrdenacoes;
                scope.obterOrdenacaoValores = obterOrdenacaoValores;
                scope.ordenarLista = ordenarLista;
                scope.ordenar = ordenar;


                scope.$watchCollection(function () {
                    return obterLista();
                }, function () {
                    ordenar(obterOrdenacoes());
                });

                function obterLista() {
                    return scope.lista ? scope.lista : [];
                };

                function obterOrdenacoes() {
                    return scope.ordenacoes ? scope.ordenacoes : [];
                };

                function eOrdenacaoBinaria(ordenacao) {
                    return ordenacao.binaria;
                }

                function obterOrdenacaoValores(ordenacao) {
                    return !eOrdenacaoBinaria(ordenacao) ? ordenacao.valores : [
                        {titulo: 'Crescente'},
                        {titulo: 'Decrescente', decrescente: true},
                    ];
                };

                function ordenar(ordenacoes) {
                    var _propriedades = [];
                    var _ordens = [];
                    if (ordenacoes.length > 0) {
                        angular.element(ordenacoes).each(function (iO, ordenacao) {
                            if (!eOrdenacaoBinaria(ordenacao) && ordenacao.valor) {
                                _propriedades.push(ordenacao.valor.propriedade);
                                _ordens.push((ordenacao.valor.decrescente ? 'asc' : 'desc'));
                            }
                            else if (ordenacao.valor) {
                                _propriedades.push(ordenacao.propriedade);
                                _ordens.push((ordenacao.valor.decrescente ? 'asc' : 'desc'));
                            }
                        });
                        scope.aoProcessarLista(ordenarLista(obterLista(), _propriedades, _ordens));
                    }
                    else {
                        scope.aoProcessarLista(obterLista());
                    }
                };

                function ordenarLista(lista, propriedades, ordens) {
                    var _listaOrdenada = lodash.orderBy(lista, propriedades, ordens);
                    return _listaOrdenada
                }

                function obterGridSpan() {
                    var propriedade = 'spanControladores';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function obterDefaults(valor) {
                    var _defaults = {
                        spanControladores: 6
                    };
                    return _defaults[valor];
                };

            }
        }

    }


})
();
