(function () {
  'use strict';

  angular
    .module('layout-right.controller', [])
    .controller('LayoutRightController', LayoutRightController);

  /** @ngInject */
  function LayoutRightController($state, CredentialFactory, LayoutService, CredentialService) {

    var vm = this;
    vm.credential = CredentialService.GetFromLocalStorage();

    vm.logOut = function () {
      LayoutService.loader.show();
      CredentialFactory.logOut(CredentialService.GetFromLocalStorage()).then(function (response) {
        LayoutService.left.hide();
        LayoutService.right.hide();
        $state.go('credential.authentication');
      }, function (error) {
        return error;
      });
    };

    vm.userDataHeight = function () {
      return angular.element('#layout-right').outerHeight() - angular.element('.user-background').outerHeight();
    };


  }
})();
