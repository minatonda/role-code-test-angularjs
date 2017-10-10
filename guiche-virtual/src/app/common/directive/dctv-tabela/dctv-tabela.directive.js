(function () {
    'use strict';

    angular.module('dctv-tabela.directive', ['dctv-tabela.factory'])
        .directive('dctvTabela', dctvTabela);

    /** @ngInject */
    function dctvTabela($filter, $base64, lodash) {

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

                scope.obterSubTabelas = obterSubTabelas;
                scope.obterSubTabelaColunas = obterSubTabelaColunas;
                scope.obterSubTabelaLinhas = obterSubTabelaLinhas;
                scope.obterSubTabelaOpcoes = obterSubTabelaOpcoes;
                scope.obterSubTabelaMenuExpancao = obterSubTabelaMenuExpancao;
                scope.obterSubTabelaExpancao = obterSubTabelaExpancao;

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
                scope.eExibirControles = eExibirControles;
                scope.eSelecao = eSelecao;

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
                        return [obterLista(), obterSubTabelas()];
                    }, function () {
                        _listaExpancaoSubTabelas = [];
                        _listaSubTabelaMenuExpancao = [];
                        angular.element(obterLista()).each(function (iL, linha) {
                            _listaExpancaoSubTabelas[iL] = {};
                            _listaSubTabelaMenuExpancao[iL] = [];
                            angular.element(obterSubTabelas()).each(function (iST, subTabelas) {
                                _listaSubTabelaMenuExpancao[iL].push({
                                    titulo: ('Expandir ' + subTabelas.titulo),
                                    icone: 'fa fa-expand',
                                    funcao: function () {
                                        alternarSubTabelaExpancao(iL, iST);
                                    }
                                });
                            });
                        });
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

                var _listaExpancaoSubTabelas = [];
                var _listaSubTabelaMenuExpancao = [];
                var _listaTabelaMenu = [];


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
                    Array.prototype.push.apply(_retorno, obterDefaults('menuTabela'));
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

                function gerarTabelaHTML(colunas, linhas, subTabelas, linhasAdicionais) {

                    var _corCabecalhoFundo = '#FA6938';
                    var _corCabecalhoFonte = '#FFFFFF';
                    var _grossuraCabecalhoFonte = 800;
                    var _corCorpoFundo = '#FFFFFF';
                    var _corCorpoFonte = '#000000';
                    var _grossuraCorpoFonte = 100;
                    var _corSubTabelaFundo = '#DDDDDD';
                    var _corSubTabelaFonte = '#000000';
                    var _grossuraSubTabelaFonte = 800;

                    var retorno = gerarTabela(colunas, linhas, subTabelas, linhasAdicionais, 0, colunas.length);
                    var html = gerarHTML(retorno);
                    dispararDownloadXLSHTML(html);

                    function gerarHTML(lista) {
                        var table = '<table border="3" cellpadding="3" cellspacing="3"><tbody>';
                        angular.element(lista).each(function (iLV1, level1) {
                            var tr = '<tr>';
                            angular.element(level1).each(function (iLV2, level2) {
                                if (level2) {
                                    tr += '<td style="color:' + level2.corFonte + ';background-color:' + level2.corFundo + ';font-weight:' + level2.grossuraFonte + '; ">' + level2.valor + '</td>';
                                }
                                else {
                                    tr += '<td></td>';
                                }
                            });
                            tr += '</tr>';
                            table += tr;
                        });
                        table += '</tbody></table>';
                        return table;
                    };

                    function dispararDownloadXLSHTML(html) {
                        var encodedUri = 'data:application/vnd.ms-excel;base64,' + $base64.encode(html);
                        var link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", (gerarNomeArquivo() + '.xls'));
                        document.body.appendChild(link); // Required for FF
                        link.click();
                        document.body.removeChild(link);
                    }

                    function obterTotalColunas(colunas, subTabelas) {
                        var celulas = 0;
                        celulas += colunas.length;
                        angular.element(subTabelas).each(function (iSt, subTabela) {
                            celulas += obterTotalColunas(subTabela.colunas, subTabela.subTabelas);
                        });
                        return celulas;
                    };

                    function gerarCabecalho(colunas, totalCelulas, celulaInicial) {
                        var _retorno = [];
                        var _celulas = new Array(totalCelulas);
                        angular.element(colunas).each(function (iC, coluna) {
                            _celulas[celulaInicial] = {
                                valor: coluna.titulo,
                                corFundo: _corCabecalhoFundo,
                                corFonte: _corCabecalhoFonte,
                                grossuraFonte: _grossuraCabecalhoFonte,
                            };
                            celulaInicial++;
                        });
                        _retorno.push(_celulas);
                        return _retorno;
                    };

                    function gerarLinha(colunas, subTabelas, linhasAdicionais, linhas, totalCelulas, celulaInicial) {
                        var _retorno = [];

                        angular.element(linhas).each(function (iL, linha) {
                            var _celulas = new Array(totalCelulas);
                            var _celulaInicial = celulaInicial;
                            angular.element(colunas).each(function (iC, coluna) {
                                _celulas[_celulaInicial] = {
                                    valor: obterColunaListaValor(linha, coluna),
                                    corFundo: _corCorpoFundo,
                                    corFonte: _corCorpoFonte,
                                    grossuraFonte: _grossuraCorpoFonte,
                                };
                                _celulaInicial++;
                            });
                            _retorno.push(_celulas);
                            angular.element(subTabelas).each(function (iT, tabela) {
                                // _retorno = _retorno.concat(gerarTabela(tabela.colunas, obterSubTabelaLinhas(tabela, linha), tabela.subTabelas, _celulaInicial, totalCelulas, true));
                                var _celulaSubTabela = new Array(totalCelulas);
                                for (var x = 0; x < _celulaInicial; x++) {
                                    _celulaSubTabela[x] = {
                                        valor: tabela.titulo,
                                        corFundo: _corSubTabelaFundo,
                                        corFonte: _corSubTabelaFonte,
                                        grossuraFonte: _grossuraSubTabelaFonte,
                                    };
                                }
                                _celulaSubTabela[_celulaInicial] = {
                                    valor: gerarTabela(tabela.colunas, obterSubTabelaLinhas(tabela, linha), tabela.subTabelas, tabela.linhasAdicionais, 0, tabela.colunas.length, true),
                                    corFundo: _corCorpoFundo,
                                    corFonte: _corCorpoFonte
                                };
                                _retorno.push(_celulaSubTabela);
                            });
                        });
                        angular.element(linhasAdicionais).each(function (iLa, linhaAdicional) {
                            var _celulas = new Array(totalCelulas);
                            var _celulaInicial = celulaInicial;
                            angular.element(linhaAdicional.colunas).each(function (iC, coluna) {
                                _celulas[_celulaInicial] = {
                                    valor: obterColunaListaValor(linhas, coluna),
                                    corFundo: linhaAdicional.cor,
                                    corFonte: _corCorpoFonte,
                                    grossuraFonte: _grossuraCorpoFonte,
                                };
                                _celulaInicial++;
                            });
                            _retorno.push(_celulas);
                        });

                        return _retorno;
                    };

                    function gerarTabela(colunas, linhas, subTabelas, linhasAdicionais, celulaInicial, totalCelulas, html) {

                        var _conteudo = [];
                        _conteudo = _conteudo.concat(gerarCabecalho(colunas, totalCelulas, celulaInicial));
                        _conteudo = _conteudo.concat(gerarLinha(colunas, subTabelas, linhasAdicionais, linhas, totalCelulas, celulaInicial));

                        if (html) {
                            return gerarHTML(_conteudo);
                        }
                        else {
                            return _conteudo;
                        }

                    };

                };
                function gerarNomeArquivo() {
                    return (document.title + "_" + (new Date().toISOString().slice(0, 10).replace(/-/g, "_"))).replace(/ /g, '_').replace(/-/g, '_');
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
                    if (coluna.largura) {
                        return coluna.largura + sufixo;
                    }
                    if (eLarguraAutomatica()) {
                        return _listaLargurasAutomaticas[obterColunas().indexOf(coluna)] + sufixo;
                    }
                    else {
                        return 0 + sufixo;
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

                function obterSubTabelas() {
                    var _valorRetorno = 'subTabelas';
                    return scope.opcoes && !angular.isUndefined(scope.opcoes[_valorRetorno]) ? scope.opcoes[_valorRetorno] : obterDefaults(_valorRetorno);
                }
                function obterSubTabelaColunas(subTabela) {
                    return angular.isFunction(subTabela.colunas) ? subTabela.colunas(linha) : subTabela.colunas;
                };
                function obterSubTabelaLinhas(subTabela, linha) {
                    return angular.isFunction(subTabela.linhas) ? subTabela.linhas(linha) : subTabela.linhas;
                };
                function obterSubTabelaOpcoes(subTabela) {
                    if (angular.isUndefined(subTabela.opcoes.paginacao)) {
                        subTabela.opcoes.paginacao = false;
                    }
                    if (angular.isUndefined(subTabela.opcoes.ordenar)) {
                        subTabela.opcoes.ordenar = false;
                    }
                    if (angular.isUndefined(subTabela.opcoes.filtrar)) {
                        subTabela.opcoes.filtrar = false;
                    }
                    if (angular.isUndefined(subTabela.opcoes.controles)) {
                        subTabela.opcoes.controles = false;
                    }
                    return subTabela.opcoes;
                };
                function obterSubTabelaMenuExpancao(linha) {
                    return _listaSubTabelaMenuExpancao[obterLista().indexOf(linha)];
                };
                function obterSubTabelaExpancao(linha, subTabela) {
                    var indiceLinha = obterLista().indexOf(linha);
                    var indiceSubTabela = obterSubTabelas().indexOf(subTabela);
                    return !_listaExpancaoSubTabelas[indiceLinha][indiceSubTabela];
                };
                function alternarSubTabelaExpancao(indiceLinha, indiceSubTabela, valor) {
                    if (angular.isUndefined(valor)) {
                        _listaExpancaoSubTabelas[indiceLinha][indiceSubTabela] = !_listaExpancaoSubTabelas[indiceLinha][indiceSubTabela];
                    }
                    else {
                        _listaExpancaoSubTabelas[indiceLinha][indiceSubTabela] = valor;
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
                function eExibirControles() {
                    var propriedade = 'controles';
                    return angular.isUndefined(scope.opcoes[propriedade]) ? obterDefaults(propriedade) : scope.opcoes[propriedade];
                };
                function eSelecao() {
                    var propriedade = 'selecao';
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
                                    if (!coluna.largura) {
                                        _retorno[iC] = (_valor.toString().length > 6 ? _valor.toString().length : 6);
                                        _retorno[iC] = _retorno[iC] != 0 ? _retorno[iC] : 5;
                                    }
                                    else {
                                        _retorno[iC] = 0;
                                    }
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
                        var _porcentagenAlocacao = 100;
                        angular.element(colunas).each(function (iC, coluna) {
                            _porcentagenAlocacao -= coluna.largura ? coluna.largura : 0;
                        });

                        angular.element(colunas).each(function (iC, coluna) {
                            _retorno[iC] = (caracteresPorCelula[iC] * _porcentagenAlocacao) / totalCaracteres;
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
                        menuTabela: [
                                {
                                    titulo: 'Gerar Excel',
                                    icone: 'fa fa-file-excel-o',
                                    funcao: function () {
                                        gerarTabelaHTML(obterColunas(), obterLista(), obterSubTabelas(), []);
                                    }
                                }
                        ],
                        subTabela: _vetorVazio,
                        larguraAutomatica: true,
                        controles: true,
                        selecao: false,
                    };
                    return _defaults[valor];
                };
            }
        }

    }


})
();
