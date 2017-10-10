(function () {
    'use strict';
    'use strict';

    /** @ngInject */
    function CommonEnderecoFactory() {

        var _source = {};
        var _command = {};

        _source.enderecos = [];
        _command.PopularEnderecos = function () {
            for (var x = 0; x <= 30; x++) {
                _source.enderecos.push(
                    {
                        ID: x,
                        Rua: ('Rua ' + Math.floor((Math.random() * x) + 1)),
                        Bairro: ('Bairro ' + Math.floor((Math.random() * x) + 1)),
                        Cidade: ('Cidade ' + Math.floor((Math.random() * x) + 1)),
                        Estado: ('Estado ' + Math.floor((Math.random() * x) + 1)),
                        CEP: ('' + x + '' + x + '' + x + '' + x + '' + x + '' + x + '' + x + '' + x + '' + x + '' + '' + x),
                        Coordenadas: {
                            lat: (
                            Math.floor((Math.random() * 9) + 1) + '' +
                            Math.floor((Math.random() * 9) + 1) + '.' +
                            Math.floor((Math.random() * 9) + 1) + '' +
                            Math.floor((Math.random() * 9) + 1)),
                            lng: (
                            Math.floor((Math.random() * 9) + 1) + '' +
                            Math.floor((Math.random() * 9) + 1) + '.' +
                            Math.floor((Math.random() * 9) + 1) + '' +
                            Math.floor((Math.random() * 9) + 1))
                        }
                    }
                );
            }
        };
        _command.PopularEnderecos();

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Obter = function (ID) {
            return angular.element.grep(_source.enderecos, function (_endereco) {
                return _endereco.ID == ID;
            })[0];
        };

        _factory.ObterTodos = function () {
            return _source.enderecos;
        };

        return _factory;
    }

    angular.module('common-endereco.factory', [])
        .factory('CommonEnderecoFactory', CommonEnderecoFactory);
})();