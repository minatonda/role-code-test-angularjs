(function () {
    'use strict';
    angular.module('global.factory', [])
        .factory('GlobalFactory', GlobalFactory);

    /** @ngInject */
    function GlobalFactory($http) {

        var _factory = this;
        _factory.obterCotacoes = obterCotacoes;

        function obterCotacoes() {
            return $http.get('http://api.promasters.net.br/cotacao/v1/valores').then(function (response) {
                return response.data;
            });
        };

        return _factory

    };

})();
