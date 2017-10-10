(function () {
    'use strict';

    angular
        .module('main.controller', [])
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(GlobalFactory) {

        var vm = this;
        vm.obterLista = obterLista;
        vm.obterListaFiltrada = obterListaFiltrada;
        vm.obterListaOrdenada = obterListaOrdenada;
        vm.obterListaPaginada = obterListaPaginada;

        vm.obterFiltros = obterFiltros;
        vm.obterOrdenacoes = obterOrdenacoes;
        vm.obterCombos = obterCombos;

        vm.obterMoeda = obterMoeda;

        vm.aoRetornarBusca = aoRetornarBusca;
        vm.aoFiltrarLista = aoFiltrarLista;
        vm.aoOrdenarLista = aoOrdenarLista;
        vm.aoPaginarLista = aoPaginarLista;

        var _listaFiltro = [
            //{titulo: 'Características', propriedade: 'caracteristicas'},
        ];
        var _listaOrdenacao = [
            {
                titulo: 'Ordenar por',
                preferencia: 0,
                valores: [
                    {titulo: 'Maior Valor', propriedade: 'preco'},
                    {titulo: 'Menor Valor', propriedade: 'preco', decrescente: true},
                ]
            },
        ];
        var _listaCombo = [
            {
                titulo: 'Moeda',
                buscarValores: GlobalFactory.obterCotacoes,
                carregar: true,
                aoSelecionar: function (item) {
                    _moeda = item;
                },
                valorExibicao: function (item) {
                    return item.nome;
                }
            }
        ];

        var _lista = null;
        var _listaFiltrada = [];
        var _listaOrdenada = [];
        var _listaPaginada = [];

        var _moeda = null;

        function obterLista() {
            return _lista;
        };

        function obterListaFiltrada() {
            return _listaFiltrada ? _listaFiltrada : _lista;
        };

        function obterListaOrdenada() {
            return _listaOrdenada ? _listaOrdenada : obterListaFiltrada();
        };

        function obterListaPaginada() {
            return _listaPaginada ? _listaPaginada : obterListaOrdenada();
        };

        function obterFiltros() {
            return _listaFiltro;
        };

        function obterOrdenacoes() {
            return _listaOrdenacao;
        };

        function obterMoeda() {
            return _moeda;
        }

        function obterCombos() {
            return _listaCombo;
        };

        function aoRetornarBusca(valores) {
            _lista = valores;
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

    }

})();
