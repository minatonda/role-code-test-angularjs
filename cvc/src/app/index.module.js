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

                /*APPLICATION MODULES*/
                'common',
                'components',
                'view'

            ]
        );

})();
