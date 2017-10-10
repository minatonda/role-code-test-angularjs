(function () {
    'use strict';

    angular.module('modulo.service', [])
        .service('ModuloService', ModuloService);

    /** @ngInject */
    function ModuloService($state, $stateParams, DadosService, lodash) {

        var service = this;

        service.obterModulos = obterModulos;

        service.redirecionarAdicionar = redirecionarAdicionar;
        service.redirecionarAtualizar = redirecionarAtualizar;
        service.redirecionarListar = redirecionarListar;

        service.eModuloAdicionar = eModuloAdicionar;
        service.eModuloAtualizar = eModuloAtualizar;
        service.eModuloListar = eModuloListar;

        service.obterParams = obterParams;
        service.obterParamId = obterParamId;

        function obterModulos() {
            return DadosService.obterModulos();
        };

        function redirecionarAdicionar() {
            var modulo = _obterModulo($state.current.name, 'adicionar');
            $state.go(modulo.state);
        };

        function redirecionarAtualizar(id) {
            var modulo = _obterModulo($state.current.name, 'atualizar');
            $state.go(modulo.state, {ID: id});
        };

        function redirecionarListar() {
            var modulo = _obterModulo($state.current.name, 'listar');
            $state.go(modulo.state);
        };

        function eModuloAdicionar() {
            return lodash.find(obterModulos(), function (modulo) {
                    return modulo.state == $state.current.name && modulo.tipo == 'adicionar';
                }) != undefined;
        };

        function eModuloAtualizar() {
            return lodash.find(obterModulos(), function (modulo) {
                    return modulo.state == $state.current.name && modulo.tipo == 'atualizar';
                }) != undefined;
        };

        function eModuloListar() {
            return lodash.find(obterModulos(), function (modulo) {
                    return modulo.state == $state.current.name && modulo.tipo == 'listar';
                }) != undefined;
        };

        function obterParams() {
            return $stateParams;
        };
        function obterParamId() {
            return obterParams().ID;
        };

        function _obterModulo(state, tipo) {
            var _modulo = lodash.find(obterModulos(), function (modulo) {
                return modulo.state == $state.current.name;
            });

            return lodash.find(obterModulos(), function (modulo) {
                return modulo.familia == _modulo.familia && modulo.tipo == tipo;
            });
        };

    }

})();
