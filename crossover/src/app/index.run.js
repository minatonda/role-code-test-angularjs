(function () {
  'use strict';

  angular
    .module('front-end')
    .run(RouteManager)
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, CredentialService, LayoutService, toastr) {
    LayoutService.Start();
    $rootScope.toastr = toastr;

    $rootScope.middleHeight = function () {
      return angular.element(window).outerHeight() - angular.element('#layout-head').outerHeight();
    };

    if (angular.element(window).outerWidth() > 991) {
      $rootScope.mobile = false;
    }
    else {
      $rootScope.mobile = true;
    }

  }

  /** @ngInject */
  function RouteManager($state, $rootScope, CredentialService, LayoutService, UserService, toastr) {

    function verificaAutorizacao(toStateName, fromStateName) {
      if (toStateName != 'credential.authentication' && toStateName != 'credential.register') {
        return (CredentialService.IsAuthorized());
      }
      return true;
    };
    function redirecionaNaoAutorizado(toStateName, fromStateName) {
      setTimeout(function () {
        $state.go('credential.authentication');
      }, 2000);
    };

    function verificaClienteSelecionado(toStateName, fromStateName) {
      if ((toStateName != 'app.home' && toStateName != 'credential.authentication')) {
        return (UserService.obterCliente() ? true : false);
      }
      return true;
    };
    function redirecionaClienteNaoSelecionado(toStateName, fromStateName) {
      toastr.error('Não há cliente selecionado.', 'Cliente');
      if ((fromStateName != 'app.home' && fromStateName != 'credential.authentication')) {
        LayoutService.loader.hide();
      } else {
        setTimeout(function () {
          $state.go('app.home');
        }, 2000);
      }
    };

    function verificaDependencias(toStateName, fromStateName) {
      return LayoutService.IsReady();
    };
    function redirecionaDependenciasNaoCarregadas(toStateName, fromStateName) {
      setTimeout(function () {
        $state.go(toStateName);
      }, 2000);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      LayoutService.loader.show();
      if (!verificaAutorizacao(toState.name) || !verificaClienteSelecionado(toState.name) || !verificaDependencias()) {
        event.preventDefault();
        if (!verificaAutorizacao(toState.name)) {
          redirecionaNaoAutorizado();
          return;
        }
        if (!verificaClienteSelecionado(toState.name)) {
          redirecionaClienteNaoSelecionado();
          return;
        }
        if (!verificaDependencias()) {
          redirecionaDependenciasNaoCarregadas(toState.name);
          return;
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      LayoutService.left.hide();
      LayoutService.right.hide();
      LayoutService.loader.hide();
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.error(error);
    });

  }


})();
