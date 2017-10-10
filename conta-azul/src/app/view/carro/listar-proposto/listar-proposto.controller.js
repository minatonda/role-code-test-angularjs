(function () {
    'use strict';

    angular
        .module('carro.listar-proposto.controller', [])
        .controller('CarroListarPropostoController', CarroListarPropostoController);

    /** @ngInject */
    function CarroListarPropostoController(DctvTabelaFactory, DadosService, ModuloService, lodash) {

        var vm = this;

        vm.obterColunas = obterColunas;
        vm.obterLinhas = obterLinhas;
        vm.obterTabelaOpcoes = obterTabelaOpcoes;

        var _colunas = gerarColunas();
        var _menuLinha = gerarMenuLinha();
        var _menuTabela = gerarMenuTabela();
        var _opcoesTabela = gerarOpcoesTabela();

        function gerarColunas() {
            return [
                new DctvTabelaFactory.Coluna('Placa', function (item) {
                    return item.placa;
                }, 16.6),
                new DctvTabelaFactory.Coluna('Modelo', function (item) {
                    return item.modelo;
                }, 16.6),
                new DctvTabelaFactory.Coluna('Marca', function (item) {
                    return item.marca;
                }, 16.6),
                new DctvTabelaFactory.Coluna('Foto', function (item) {
                    return item.imagem ? 'Sim' : 'Não';
                }, 16.6,{
                    diretiva: {
                        tipo: 'tooltip',
                        html: function (item) {
                            return '<img src="' + item.imagem + '">';
                        }
                    }
                }),
                new DctvTabelaFactory.Coluna('Combustível', function (item) {
                    return item.combustivel;
                }, 16.6),
                new DctvTabelaFactory.Coluna('Valor', function (item) {
                    return item.valor;
                }, 16.6, {
                    moeda: true
                })
            ];
        };
        function gerarMenuLinha() {
            return [
                {
                    titulo: 'Editar',
                    icone: 'fa fa-edit',
                    funcao: editar
                },
                {
                    titulo: 'Remover',
                    icone: 'fa fa-remove',
                    funcao: remover
                }
            ];
        };
        function gerarMenuTabela() {
            return [
                {
                    titulo: 'Cadastrar',
                    icone: 'fa fa-plus',
                    funcao: adicionar
                }
            ];
        };
        function gerarOpcoesTabela() {
            return {
                menuLinha: _menuLinha,
                menuTabela: _menuTabela,
                paginacao: {lista: false}
            };
        };

        function obterColunas() {
            return _colunas ? _colunas : [];
        };
        function obterLinhas() {
            return DadosService.obterCarros();
        };
        function obterTabelaOpcoes() {
            return _opcoesTabela;
        };

        function adicionar() {
            ModuloService.redirecionarAdicionar();
        };

        function editar(modelo) {
            ModuloService.redirecionarAtualizar(obterLinhas().indexOf(modelo));
        };

        function remover(modelo) {
            lodash.remove(obterLinhas(), function (item) {
                return item == modelo;
            });
        };

    }

})();
