(function () {
    'use strict';

    angular
        .module('layout',
            [
                'layout.service',
                'layout-header.controller',
                'layout-right.controller',
                'layout-left.controller'
            ]
        );

})();
