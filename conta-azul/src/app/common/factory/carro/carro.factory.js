(function () {
    'use strict';
    angular.module('carro.factory', [])
        .factory('CarroFactory', CarroFactory);

    /** @ngInject */
    function CarroFactory($q, DadosService, lodash) {

        var factory = this;
        factory.obterTodos = obterTodos;
        factory.obter = obter;
        factory.adicionar = adicionar;
        factory.atualizar = atualizar;

        function adicionar(modelo) {
            var deffered = $q.defer();
            setTimeout(function () {
                modelo.id = lodash.maxBy(DadosService.obterCarros(), function (_modelo) {
                        return _modelo.id;
                    }).id + 1;
                DadosService.obterCarros().push(modelo);
                deffered.resolve(modelo);
            }, 200);
            return deffered.promise;
        };

        function atualizar(modelo) {
            var deffered = $q.defer();
            setTimeout(function () {
                var _modelo = lodash.find(DadosService.obterCarros(), function (__modelo) {
                    return modelo.id == __modelo.id;
                });
                for (var key in _modelo) {
                    _modelo[key] = modelo[key];
                }
                deffered.resolve();
            }, 200);
            return deffered.promise;
        };

        function obter(id) {
            var deffered = $q.defer();
            setTimeout(function () {
                deffered.resolve(angular.copy(lodash.find(DadosService.obterCarros(), function (modelo) {
                    return modelo.id == id;
                })));
            }, 200);
            return deffered.promise;
        };

        function obterTodos() {
            var deffered = $q.defer();
            setTimeout(function () {
                deffered.resolve([
                    {
                        "id": 0,
                        "combustivel": "Flex",
                        "imagem": null,
                        "marca": "Volkswagem",
                        "modelo": "Gol",
                        "placa": "FFF-5498",
                        "valor": "20000"
                    },
                    {
                        "id": 1,
                        "combustivel": "Gasolina",
                        "imagem": null,
                        "marca": "Volkswagem",
                        "modelo": "Fox",
                        "placa": "FOX-4125",
                        "valor": "20000"
                    },
                    {
                        "id": 2,
                        "combustivel": "Alcool",
                        "imagem": "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg",
                        "marca": "Volkswagen",
                        "modelo": "Fusca",
                        "placa": "PAI-4121",
                        "valor": "20000"
                    }
                ]);
            }, 200);
            return deffered.promise;
        };

        return factory

    };

})();
