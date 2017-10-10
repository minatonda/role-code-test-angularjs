(function () {
    'use strict';

    angular
        .module('main.controller', [])
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(DadosService) {

        var vm = this;
        vm.obterModulos = obterModulos;

        function obterModulos() {
            return DadosService.obterModulos();
        }

    }

})();
