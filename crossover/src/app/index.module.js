(function () {
  'use strict';

  angular
    .module('front-end',
      [
        /*ANGULAR MODULES*/
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'ngMd5',

        /*THYRD PARTIE MODULES*/
        'ngLodash',

        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'LocalStorageModule',
        'toastr',

        /*APPLICATION MODULES*/
        'common',
        'components',
        'view'

      ]
    );

})();
