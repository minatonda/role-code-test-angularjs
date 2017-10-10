(function () {
    'use strict';

    angular.module('dctv-filtro.directive', [])
        .directive('dctvFiltro', dctvFiltro);

    /** @ngInject */
    function dctvFiltro(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                listaProcessada: '=',
                filtros: '=',
                atributosFiltroString: '=',
                aoProcessarLista: '=',
                spanControladores: '=',
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-filtro/dctv-filtro.tpl.html',
            link: function (scope, element, attrs) {

                scope.obterFiltros = obterFiltros;
                scope.obterValoresFiltro = obterValoresFiltro;
                scope.obterGridSpan = obterGridSpan;
                scope.processarListaTexto = processarListaTexto;
                scope.processarListaFiltros = processarListaFiltros;

                scope.$watchCollection(function () {
                    return obterLista();
                }, function () {
                    obterLista().length > 0 ? processarListaFiltros() : processarListaTexto(obterTextoFiltro());
                });

                function eListaDeString(lista) {
                    return angular.isString(lista[0]);
                };

                function obterFiltros() {
                    return scope.filtros ? scope.filtros : [];
                };
                function obterValoresFiltro(filtro) {
                    var retorno = [];
                    angular.element(obterLista()).each(function (iI, item) {
                        if (angular.isArray(item[filtro.propriedade])) {
                            retorno.push.apply(retorno, lodash.filter(item[filtro.propriedade], function (valores) {
                                return retorno.indexOf(valores) == -1;
                            }));
                        }
                        else if (retorno.indexOf(item[filtro.propriedade]) == -1) {
                            retorno.push(item[filtro.propriedade]);
                        }
                    });
                    return retorno;
                };
                function obterLista() {
                    return scope.lista ? scope.lista : [];
                };
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
                function obterAtributosFiltroString() {
                    return scope.atributosFiltroString ? scope.atributosFiltroString : [];
                };
                function obterTextoFiltro() {
                    return scope.textoFiltro;
                };

                function processarListaTexto(valorFiltroString) {
                    if (valorFiltroString) {
                        if (eListaDeString(obterLista())) {
                            scope.aoProcessarLista(filtrarListaString(obterLista(), valorFiltroString));
                        }
                        else {
                            scope.aoProcessarLista(filtrarListaObjeto(obterLista(), valorFiltroString, obterAtributosFiltroString()));
                        }
                    }
                    else {
                        scope.aoProcessarLista(obterLista());
                    }
                };

                function processarListaFiltros(filtro) {
                    scope.aoProcessarLista(filtrarListaPorFiltros(obterLista(), obterFiltros()));
                };

                function filtrarListaString(vetor, valor) {
                    return lodash.filter(vetor, function (item) {
                        return item && item.toString().toLowerCase().indexOf(valor.toString().toLowerCase()) > -1;
                    });
                };
                function filtrarListaObjeto(vetor, valor, filtros) {
                    var retorno = [];
                    filtros = filtros.length > 0 ? filtros : Object.keys(vetor[0]);
                    angular.element(filtros).each(function (iF, filtro) {
                        var _filtrados = lodash.filter(vetor, function (item) {
                            var _valorPropriedade = angular.isFunction(filtro) ? filtro(item) : item[filtro];
                            return _valorPropriedade && _valorPropriedade.toString().toLowerCase().indexOf(valor.toString().toLowerCase()) > -1;
                        });
                        Array.prototype.push.apply(retorno, _filtrados);
                    });
                    return removerDuplicatas(retorno);
                };
                function filtrarListaPorFiltros(vetor, filtros) {
                    var retorno = []
                    if (filtros && filtros.length > 0) {
                        angular.element(filtros).each(function (iF, filtro) {
                            var _filtrados = lodash.filter(vetor, function (item) {
                                var _valorPropriedade = item[filtro.propriedade];
                                if (angular.isArray(_valorPropriedade)) {
                                    return _valorPropriedade.indexOf(filtro.valor) > -1;
                                }
                                else {
                                    return _valorPropriedade && _valorPropriedade == filtro.valor;
                                }
                            });
                            Array.prototype.push.apply(retorno, _filtrados);
                        });
                    }
                    else {
                        retorno = vetor;
                    }
                    return removerDuplicatas(retorno);
                };

                function removerDuplicatas(vetor) {
                    return lodash.uniqBy(vetor, function (item) {
                        return item;
                    });
                };

            }
        }

    }


})
();
