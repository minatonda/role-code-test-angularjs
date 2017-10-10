(function () {
    'use strict';

    /** @ngInject */
    function UsuarioDetalheController(CommonUsuarioFactory, $stateParams) {
        var vm = this;

        vm.crud = {};
        vm.crud.usuario = CommonUsuarioFactory.Obter($stateParams.ID);
        vm.source = {};
        //vm.source.usuarios = CommonUsuarioFactory.ObterTodos();
        vm.command = {};

        vm.calendar = {
            opened: {},
            dateFormat: 'dd/MM/yyyy',
            dateOptions: {},
            open: function ($event, which) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.calendar.opened[which] = true;
            }
        };


    }

    angular.module('usuario-detalhe.controller', [])
        .controller('UsuarioDetalheController', UsuarioDetalheController);

})();