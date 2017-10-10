(function () {
    'use strict';

    angular.module('dados-gerenciamento.service', [])
        .service('DadosGerenciamentoService', DadosGerenciamentoService);

    /** @ngInject */
    function DadosGerenciamentoService(API, DadosService, CarroFactory, CombustivelFactory, ModuloFactory, lodash) {

        var service = this;
        service.sincronizarDados = sincronizarDados;
        service.obterNaoSincronizados = obterNaoSincronizados;

        var _listaStatus = [];
        _iniciar();

        function sincronizarDados() {
            atualizarListaCarros();
            atualizarListaModulos();
            atualizarListaCombustiveis();
        };

        function obterNaoSincronizados() {
            return lodash.filter(_listaStatus, function (status) {
                return status.descricao == 'nao-iniciado';
            });
        };

        function atualizarListaCarros() {
            _atualizarStatusAguardando(API.LISTA.CARROS);
            CarroFactory.obterTodos().then(sucesso, erro);
            function sucesso(resultado) {
                DadosService.atualizarCarros(resultado);
                _atualizarStatusRecebido(API.LISTA.CARROS);
            };
            function erro(erro) {
                _atualizarStatusErro(API.LISTA.CARROS);
                atualizarListaCarros();
            };
        };

        function atualizarListaCombustiveis() {
            _atualizarStatusAguardando(API.LISTA.COMBUSTIVEIS);
            CombustivelFactory.obterTodos().then(sucesso, erro);
            function sucesso(resultado) {
                DadosService.atualizarCombustiveis(resultado);
                _atualizarStatusRecebido(API.LISTA.COMBUSTIVEIS);
            };
            function erro(erro) {
                _atualizarStatusErro(API.LISTA.COMBUSTIVEIS);
                atualizarListaCombustiveis();
            };
        };

        function atualizarListaModulos() {
            _atualizarStatusAguardando(API.LISTA.MODULOS);
            ModuloFactory.obterTodos().then(sucesso, erro);
            function sucesso(resultado) {
                DadosService.atualizarModulos(resultado);
                _atualizarStatusRecebido(API.LISTA.MODULOS);
            };
            function erro(erro) {
                _atualizarStatusErro(API.LISTA.MODULOS);
                atualizarListaCarros();
            };
        };

        function _atualizarStatusAguardando(id) {
            _atualizarStatusLista({id: id, descricao: 'aguardando'});
        };

        function _atualizarStatusRecebido(id) {
            _atualizarStatusLista({id: id, descricao: 'recebido'});
        };

        function _atualizarStatusErro(id) {
            _atualizarStatusLista({id: id, descricao: 'erro'});
        };

        function _atualizarStatusLista(valor) {
            lodash.find(_listaStatus, function (status) {
                return status.id == valor.id;
            }).descricao = valor.descricao;
        };

        function _iniciar() {
            for (var id in API.LISTA) {
                _listaStatus.push({id: API.LISTA[id], descricao: 'nao-iniciado'});
            }
        };


    }

})();
