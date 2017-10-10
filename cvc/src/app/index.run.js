(function () {
  'use strict';

  angular
    .module('front-end')
    .run(RouteManager)
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, toastr) {
    $rootScope.toastr = toastr;
    $rootScope.middleHeight = function () {
      return angular.element(window).outerHeight() - angular.element('#layout-head').outerHeight();
    };
    $rootScope.mobile = function () {
      return !(angular.element(window).outerWidth() > 991);
    };
  }

  /** @ngInject */
  function RouteManager($state, $rootScope, toastr) {

  }

})();
