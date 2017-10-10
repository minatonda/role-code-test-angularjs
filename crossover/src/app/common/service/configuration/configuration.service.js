(function () {
    'use strict';

    angular.module('configuration.service', [])
        .service('ConfigurationService', ConfigurationService);

    /** @ngInject */
    function ConfigurationService() {

        var _service = this;

        _service.LOCAL = 'http://localhost:10362/';
        _service.PROD = 'http://localhost:10362/';
        _service.CURRENT = _service.LOCAL;


    }


})();
