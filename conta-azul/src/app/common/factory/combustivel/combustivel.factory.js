(function () {
    'use strict';
    angular.module('combustivel.factory', [])
        .factory('CombustivelFactory', CombustivelFactory);

    /** @ngInject */
    function CombustivelFactory($q, DadosService) {

        var factory = this;
        factory.obterTodos = obterTodos;
        factory.obter = obter;


        function obter(id) {
            var deffered = $q.defer();
            setTimeout(function () {
                deffered.resolve(DadosService.obterCombustivels()[id]);
            }, 1000);
            return deffered.promise;
        };

        function obterTodos() {
            var deffered = $q.defer();
            setTimeout(function () {
                deffered.resolve([
                    {
                        nome: 'Gasolina'
                    },
                    {
                        nome: 'Alcool'
                    },
                    {
                        nome: 'Flex'
                    },
                ]);
            }, 1000);
            return deffered.promise;
        };

        return factory

    };

})();
