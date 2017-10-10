(function () {
    'use strict';

    angular
      .module('front-end')
      .factory('AppInterceptor', AppInterceptor)
      .config(config);

    /** @ngInject */
    function AppInterceptor($q, $rootScope) {


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
          return preProcessResponse(res);
        },

        responseError: function (res) {
          return $q.reject(preProcessResponse(res));
        }
      };

      function preProcessResponse(response) {
        try {
          if (response.data && response.data.RespostaInterna) {
            var _response = response.data;
            angular.element(_response.Mensagens.Mensagens).each(function (iM, message) {
              toastr[_response.Mensagens.Tipo](message, _response.Mensagens.Titulo);
            });

            return _response.Resultado;

          }
          if (response.status == 401) {
            $rootScope.$broadcast('unauthorized');
            toastr[_response.Mensagens.Tipo](message, _response.Mensagens.Titulo);

          }
        } catch (exception) {
          console.log('Toastr não carregado');
        }
        return response;
      };
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

      //Windows Auth
      //$httpProvider.defaults.useXDomain = true;

      // Declare the Interceptor
      $httpProvider.interceptors.push('AppInterceptor');

      // Configure LocalStorageService
      localStorageServiceProvider
        .setPrefix('cebrace-links')
        .setStorageType('localStorage')
        .setNotify(true, true)
    }

  })();
