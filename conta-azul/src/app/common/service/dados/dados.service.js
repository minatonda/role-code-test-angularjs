(function () {
    'use strict';

    angular.module('dados.service', [])
        .service('DadosService', DadosService);

    /** @ngInject */
    function DadosService(API, lodash) {

        var service = this;
        service.obterModulos = obterModulos;
        service.atualizarModulos = atualizarModulos;
        service.obterCarros = obterCarros;
        service.atualizarCarros = atualizarCarros;
        service.obterCombustiveis = obterCombustiveis;
        service.atualizarCombustiveis = atualizarCombustiveis;

        var _listas = [];
        _iniciar();

        function atualizarModulos(valor) {
            _atualizarLista(API.LISTA.MODULOS, valor);
        };

        function obterModulos() {
            return _obterLista(API.LISTA.MODULOS);
        };

        function atualizarCarros(valor) {
            _atualizarLista(API.LISTA.CARROS, valor);
        };

        function obterCarros() {
            return _obterLista(API.LISTA.CARROS);
        };

        function atualizarCombustiveis(valor) {
            _atualizarLista(API.LISTA.COMBUSTIVEIS, valor);
        };

        function obterCombustiveis() {
            return _obterLista(API.LISTA.COMBUSTIVEIS);
        };

        function _atualizarLista(apiLista, novoValor) {
            lodash.find(_listas, function (lista) {
                return lista.id == apiLista;
            }).dados = novoValor;
        };

        function _obterLista(apiLista) {
            return lodash.find(_listas, function (lista) {
                return lista.id == apiLista;
            }).dados;
        };

        function _iniciar() {
            for (var id in API.LISTA) {
                _listas.push({id: API.LISTA[id], dados: []});
            }
        };


    }

})();
