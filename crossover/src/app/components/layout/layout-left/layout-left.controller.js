(function () {
    'use strict';

    angular
        .module('layout-left.controller', [])
        .controller('LayoutLeftController', LayoutLeftController);

    /** @ngInject */
    function LayoutLeftController($state, LayoutService, StateService) {
        var vm = this;
        vm.sourceMenus = [];
    }
})();
