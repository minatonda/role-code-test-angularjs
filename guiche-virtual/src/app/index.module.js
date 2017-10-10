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

                /*THYRD PARTIE MODULES*/
                'ngLodash',
                'ngMask',

                'ui.router',
                'ui.bootstrap',
                'ui.select',
                'ui.checkbox',
                'wt.responsive',
                'ui.utils.masks',
                'ui.bootstrap.contextMenu',
                'colorpicker.module',
                'LocalStorageModule',
                'toastr',
                'base64',
                /*APPLICATION MODULES*/
                'common',
                'components',
                'view'

            ]
        );

})();
