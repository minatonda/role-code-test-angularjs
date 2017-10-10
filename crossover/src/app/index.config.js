(function () {
  'use strict';

  angular
    .module('front-end')
    .factory('AppInterceptor', AppInterceptor)
    .config(config);

  /** @ngInject */
  function AppInterceptor($q, $rootScope, $injector, CredentialService) {

    var toastr = $rootScope.toastr;
    var toastInterval = setInterval(function () {
      if (toastr) {
        clearInterval(toastInterval);
      }
      toastr = $rootScope.toastr;
    });
    return {
      request: function (res) {
        return res;
      },

      requestError: function (res) {
        return $q.reject(res);
      },

      response: function (res) {
        if (res.data.status) {
          if (res.data.status == 'error') {
            toastr.error(res.data.error);
            return $q.reject(res);
          }
        }
        return res;
      },

      responseError: function (res) {
        if(res.status<0){
          toastr.error("Connection Refused","Connection");
        }
        else {
          if (res.status == 401) {
            CredentialService.Unauthorize();
            $injector.get('$state').transitionTo('credential.authentication');
          }
          if (res.data.status == 'error') {
            toastr.error(res.data.error);
          }
        }
        return $q.reject(res);
      }
    }
  }

  /** @ngInject */
  function config($logProvider, $httpProvider, localStorageServiceProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // Declare the Interceptor
    $httpProvider.interceptors.push('AppInterceptor');

    // Configure LocalStorageService
    localStorageServiceProvider
      .setPrefix('ecommerce-vidrio-andino')
      .setStorageType('localStorage')
      .setNotify(true, true)
  }

})();
