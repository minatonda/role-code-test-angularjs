(function () {
    'use strict';

    angular
        .module('walmartTest')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(toastr, CommonUsuarioFactory) {

        var vm = this;
        vm.crud = {};
        vm.source = {};
        vm.source.pedidos = CommonUsuarioFactory.ObterTodos();

    }
})();
