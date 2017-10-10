(function () {
    'use strict';

    angular
        .module('carro.adicionar-atualizar.controller', [])
        .controller('CarroAdicionarAtualizarController', CarroAdicionarAtualizarController);

    /** @ngInject */
    function CarroAdicionarAtualizarController(CarroFactory, DadosService, ModuloService) {

        var vm = this;
        vm.modelo = {};
        vm.salvar = salvar;
        vm.obterTitulo = obterTitulo;
        vm.obterCombustiveis = obterCombustiveis;

        function obterTitulo() {
            return (ModuloService.eModuloAdicionar() ? 'Adicionar' : 'Atualizar') + ' Carro';
        };

        function obterCombustiveis() {
            return DadosService.obterCombustiveis();
        }

        function adicionar(modelo) {
            CarroFactory.adicionar(modelo).then(sucesso, erro);

            function sucesso(resultado) {
                ModuloService.redirecionarAtualizar(resultado.id);
            };

            function erro(resultado) {

            };

        };

        function atualizar(modelo) {
            CarroFactory.atualizar(modelo).then(sucesso, erro);

            function sucesso(resultado) {
                ModuloService.redirecionarListar();
            };

            function erro(resultado) {

            };

        };

        function salvar(modelo) {
            if (ModuloService.eModuloAdicionar()) {
                adicionar(modelo);
            } else if (ModuloService.eModuloAtualizar()) {
                atualizar(modelo);
            }
        };

        function obterParaAtualizar(id) {
            CarroFactory.obter(id).then(sucesso, erro);

            function sucesso(resultado) {
                vm.modelo = resultado;
            };

            function erro(resultado) {
                ModuloService.redirecionarListar();
            };

        };

        function iniciar() {

            if (ModuloService.eModuloAtualizar()) {
                obterParaAtualizar(ModuloService.obterParams().ID);
            }

        };
        iniciar();

    }

})();
