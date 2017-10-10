(function () {
    'use strict';

    angular
        .module('icones-rapidos.controller', [])
        .controller('IconesRapidosController', IconesRapidosController);

    /** @ngInject */
    function IconesRapidosController(DadosService, lodash) {

        var vm = this;
        vm.obterModulos = obterModulos;

        function obterModulos() {
            return lodash.filter(DadosService.obterModulos(), function (modulo) {
                return ['listar', 'padrao'].indexOf(modulo.tipo) > -1;
            });
        }


    }

})();
