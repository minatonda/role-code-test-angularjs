(function () {
    'use strict';

    angular.module('dctv-tabela.directive', ['dctv-tabela.factory'])
        .directive('dctvTabela', dctvTabela);

    /** @ngInject */
    function dctvTabela($filter, lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                colunas: '=',
                lista: '=',
                opcoes: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-tabela/dctv-tabela.tpl.html',
            link: function (scope, element, attrs) {

                scope.obterColunas = obterColunas;
                scope.obterColunaTitulo = obterColunaTitulo;
                scope.obterColunaListaValor = obterColunaListaValor;
                scope.obterColunaLargura = obterColunaLargura;
                scope.obterColunaDiretiva = obterColunaDiretiva;

                scope.obterLista = obterLista;
                scope.obterListaFiltrada = obterListaFiltrada;
                scope.obterListaOrdenada = obterListaOrdenada;
                scope.obterListaPaginada = obterListaPaginada;
                scope.obterListaSelecao = obterListaSelecao;
                scope.obterListaIndiceItem = obterListaIndiceItem;
                scope.obterListaTodosItensEstaoSelecionados = obterListaTodosItensEstaoSelecionados;

                scope.obterMenuLinha = obterMenuLinha;
                scope.obterMenuTabela = obterMenuTabela;

                scope.obterFiltros = obterFiltros;
                scope.obterOrdenacoes = obterOrdenacoes;

                scope.aoFiltrarLista = aoFiltrarLista;
                scope.aoOrdenarLista = aoOrdenarLista;
                scope.aoPaginarLista = aoPaginarLista;

                scope.eDiretiva = eDiretiva;
                scope.eDiretivaTipo = eDiretivaTipo;
                scope.eFiltrar = eFiltrar;
                scope.eOrdenar = eOrdenar;
                scope.ePaginacao = ePaginacao;
                scope.ePaginacaoEmLista = ePaginacaoEmLista;

                scope.alternarSelecaoLista = alternarSelecaoLista;

                scope.$watchCollection(
                    function () {
                        return obterColunas();
                    }, function () {
                        _listaFiltro = gerarFiltros();
                    }
                );

                scope.$watchCollection(
                    function () {
                        return obterListaSelecao();
                    }, function () {
                        scope.selecionarTudo = obterListaTodosItensEstaoSelecionados(obterListaPaginada());
                    }
                );

                scope.$watchCollection(
                    function () {
                        return obterListaPaginada();
                    }, function () {
                        scope.selecionarTudo = obterListaTodosItensEstaoSelecionados(obterListaPaginada());
                        _listaLargurasAutomaticas = obterLargurasAutomaticas();
                    }
                );

                scope.$watch(function () {
                    return scope.opcoes;
                }, function () {
                    _listaFiltro = gerarFiltros();
                    _listaOrdenacao = gerarOrdenacoes();
                    _menuTabela = gerarMenuTabela();
                });

                var _vetorVazio = [];
                var _listaFiltrada = [];
                var _listaOrdenada = [];
                var _listaPaginada = [];

                var _listaFiltro = gerarFiltros();
                var _listaOrdenacao = gerarOrdenacoes();
                var _menuTabela = gerarMenuTabela();

                var _listaSelecao = [];
                var _listaLargurasAutomaticas = [];


                function gerarOrdenacoes() {
                    return [
                        {
                            titulo: 'Ordenar por',
                            preferencia: 0,
                            valores: gerarOrdenacoesPorObjeto(),
                            tiposOrdenacao: true
                        },
                    ];
                };

                function gerarOrdenacoesPorObjeto() {
                    var _retorno = [];
                    angular.element(obterColunas()).each(function (iC, coluna) {
                        _retorno.push({
                            titulo: obterColunaTitulo(coluna),
                            propriedade: function (item) {
                                return obterColunaListaValor(item, coluna);
                            }
                        });
                    });
                    return _retorno;
                };

                function gerarMenuTabela() {
                    var _retorno = [];
                    Array.prototype.push.apply(_retorno, scope.opcoes.menuTabela);
                    Array.prototype.push.apply(_retorno, []);
                    return _retorno;
                };

                function gerarFiltros() {
                    var _retorno = [];
                    angular.element(obterColunas()).each(function (iC, coluna) {
                        _retorno.push(function (item) {
                            return obterColunaListaValor(item, coluna);
                        });
                    });
                    return _retorno;
                };

                function obterColunas() {
                    return scope.colunas ? scope.colunas : _vetorVazio;
                };
                function obterColunaTitulo(coluna) {
                    return angular.isFunction(coluna.titulo) ? coluna.titulo() : coluna.titulo;
                };
                function obterColunaListaValor(linha, coluna) {
                    var valor = '';
                    if (linha) {
                        valor = angular.isFunction(coluna.propriedade) ? coluna.propriedade(linha) : linha[coluna.propriedade];
                    }

                    if (eDataHora(coluna)) {
                        valor = $filter('date')(valor, 'dd/MM/yyyy HH:mm', undefined)
                    }
                    else if (eData(coluna)) {
                        valor = $filter('date')(valor, 'dd/MM/yyyy', undefined)
                    }
                    else if (eHora(coluna)) {
                        valor = $filter('date')(valor, 'HH:mm', undefined)
                    }
                    else if (eMoeda(coluna)) {
                        valor = $filter('currency')(valor, (eMoeda(coluna).simbolo ? eMoeda(coluna).simbolo : 'R$'), 2);
                    }

                    return valor;
                };
                function obterColunaLargura(coluna, sufixo) {
                    if (eLarguraAutomatica()) {
                        return _listaLargurasAutomaticas[obterColunas().indexOf(coluna)] + sufixo;
                    }
                    else {
                        return coluna.largura + sufixo;
                    }
                };
                function obterColunaDiretiva(coluna) {
                    return coluna.diretiva;
                };

                function obterLista() {
                    return scope.lista ? scope.lista : _vetorVazio;
                };
                function obterListaFiltrada() {
                    return eFiltrar() ? _listaFiltrada : obterLista();
                };
                function obterListaOrdenada() {
                    return eOrdenar() ? _listaOrdenada : obterListaFiltrada();
                };
                function obterListaPaginada() {
                    return ePaginacao() ? _listaPaginada : obterListaOrdenada();
                };
                function obterListaSelecao() {
                    return _listaSelecao;
                };
                function obterListaIndiceItem(item, lista) {
                    return lista.indexOf(item);
                };
                function obterListaTodosItensEstaoSelecionados(lista) {
                    if (!lista || (lista && lista.length == 0)) {
                        return false;
                    }
                    else {
                        var _valoresVerdadeiros = [];
                        var _valoresFalsos = [];
                        var _valoresIndefinidos = [];
                        angular.element(lista).each(function (i, item) {
                            if (_listaSelecao[obterListaIndiceItem(item, obterLista())] === true) {
                                _valoresVerdadeiros.push(item);
                            }
                            else if (_listaSelecao[obterListaIndiceItem(item, obterLista())] === false) {
                                _valoresFalsos.push(item);
                            }
                            else {
                                _valoresIndefinidos.push(item);
                            }

                        });

                        if (_valoresVerdadeiros.length == lista.length) {
                            return true;
                        }
                        else if (_valoresFalsos.length == lista.length) {
                            return false;
                        }
                        else {
                            return undefined;
                        }
                    }
                };

                function obterMenuLinha() {
                    var _valorRetorno = 'menuLinha';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno] : obterDefaults(_valorRetorno);
                };

                function obterMenuTabela() {
                    return _menuTabela;
                };

                function obterFiltros() {
                    return _listaFiltro;
                };
                function obterOrdenacoes() {
                    return _listaOrdenacao;
                };

                function eEditavel(coluna) {
                    return coluna.editavel;
                };
                function eData(coluna) {
                    return coluna.data;
                };
                function eHora(coluna) {
                    return coluna.hora;
                };
                function eDataHora(coluna) {
                    return eData(coluna) && eHora(coluna);
                };
                function eMoeda(coluna) {
                    return coluna.moeda;
                };
                function eDiretiva(coluna) {
                    return coluna.diretiva;
                };
                function eDiretivaTipo(coluna, tipo) {
                    return eDiretiva(coluna).tipo == tipo;
                };

                function eValorNormal(coluna) {
                    return !eDiretiva(coluna) && !eEditavel(coluna);
                };
                function eValorNormalEditavel(coluna) {
                    return eValorNormal(coluna) && eEditavel(coluna);
                };

                function eFiltrar() {
                    var _valorRetorno = 'filtrar';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno] : obterDefaults(_valorRetorno);
                };
                function eOrdenar() {
                    var _valorRetorno = 'ordenar';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno] : obterDefaults(_valorRetorno);
                };
                function ePaginacao() {
                    var _valorRetorno = 'paginacao';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno] : obterDefaults(_valorRetorno);
                };
                function ePaginacaoEmLista() {
                    var _valorRetorno = 'paginacao';
                    var _valorRetorno2 = 'paginacaoLista';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno].lista : obterDefaults(_valorRetorno2);
                };
                function eLarguraAutomatica() {
                    var propriedade = 'larguraAutomatica';
                    return angular.isUndefined(scope.opcoes[propriedade]) ? obterDefaults(propriedade) : scope.opcoes[propriedade];
                };

                function aoFiltrarLista(valores) {
                    _listaFiltrada = valores;
                };
                function aoOrdenarLista(valores) {
                    _listaOrdenada = valores;
                };
                function aoPaginarLista(valores) {
                    _listaPaginada = valores;
                };

                function obterLargurasAutomaticas() {
                    var _caracteresPorColuna = obterNumeroCaracteresPorColuna(obterListaPaginada(), obterColunas());
                    var _totalCaracteresPorColuna = obterNumeroTotalCaracteresLista(_caracteresPorColuna);
                    return _obterLargurasAutomaticas(_caracteresPorColuna, _totalCaracteresPorColuna, obterColunas());

                    function obterNumeroCaracteresPorColuna(linhas, colunas) {
                        var _retorno = [];
                        angular.element(linhas).each(function (iL, linha) {
                            angular.element(colunas).each(function (iC, coluna) {
                                var _valor = (obterColunaListaValor(linha, coluna) ? obterColunaListaValor(linha, coluna) : '').toString();
                                if ((!angular.isNumber(_retorno[iC])) || (_valor.toString().length > _retorno[iC])) {
                                    _retorno[iC] = (_valor.toString().length > 6 ? _valor.toString().length : 6);
                                    _retorno[iC] = _retorno[iC] != 0 ? _retorno[iC] : 5;
                                }
                            });
                        });
                        return _retorno;
                    };
                    function obterNumeroTotalCaracteresLista(caracteresPorCelula) {
                        var _retorno = 0;
                        angular.element(caracteresPorCelula).each(function (iNc, numeroCaracteres) {
                            _retorno += numeroCaracteres;
                        });
                        return _retorno;
                    };
                    function _obterLargurasAutomaticas(caracteresPorCelula, totalCaracteres, colunas) {
                        var _retorno = [];
                        angular.element(colunas).each(function (iC, coluna) {
                            _retorno[iC] = (caracteresPorCelula[iC] * 100) / totalCaracteres;
                        });
                        return _retorno;
                    };

                };

                function alternarSelecaoLista(valor, lista) {
                    angular.element(lista).each(function (i, item) {
                        obterListaSelecao()[obterListaIndiceItem(item, obterLista())] = valor;
                    });
                };

                function obterDefaults(valor) {
                    var _defaults = {
                        paginacao: true,
                        paginacaoLista: false,
                        ordenar: true,
                        filtrar: true,
                        menuLinha: _vetorVazio,
                        menuTabela: _menuTabela,
                        larguraAutomatica: true
                    };
                    return _defaults[valor];
                };
            }
        }

    }


})
();
