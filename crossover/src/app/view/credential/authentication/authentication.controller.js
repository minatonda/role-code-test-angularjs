(function () {
  'use strict';

  angular
    .module('credential.authentication.controller', [])
    .controller('AuthenticationController', AuthenticationController);

  /** @ngInject */
  function AuthenticationController($state, CredentialFactory, toastr) {

    var vm = this;

    vm.register = {};
    vm.showModalRegister = false;

    vm.authentication = {};

    vm.optionsAuthentication = [];

    vm.Authenticate = function () {
      ShowLoadinglogIn();
      CredentialFactory.logIn(vm.authentication).then(function (result) {
        toastr.success('Authenticated!', 'Authentication');
        $state.go('app.home');
        HideLoadinglogIn();
      }, function (error) {
        HideLoadinglogIn();
      });
    };

    function GetOptionsAuthentication() {

      vm.optionsAuthentication = [
        {descricao: 'Permanecer conectado', valor: true},
        {descricao: 'No permanece autenticado', valor: false}
      ];
      vm.SempreAutenticado = vm.optionsAuthentication[0];

    };
    GetOptionsAuthentication();

    vm.ShowRegister = function () {
      vm.showModalRegister = true;
    };

    function ShowLoadinglogIn() {
      angular.element('.formulario-authentication-loading').css('top', '0%');
    };
    function HideLoadinglogIn() {
      angular.element('.formulario-authentication-loading').css('top', '100%');
    };

  }

})();
