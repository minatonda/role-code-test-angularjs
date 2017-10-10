(function () {
    'use strict';

    /** @ngInject */
    function CommonUsuarioFactory(CommonEnderecoFactory) {

        var _source = {};
        _source.nomes = ['', 'João', 'Anderson', 'Matheus', 'Igor'];

        var _command = {};

        _source.pedidos = [];
        _command.PopularUsuarios = function () {
            for (var x = 0; x <= 30; x++) {
                var _usuario = {};
                _usuario.ID = x;
                _usuario.CPF = (''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+''+x);
                _usuario.RG = (''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x);
                _usuario.TelefoneResidencial = (''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x);
                _usuario.TelefoneComercial = (''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x);
                _usuario.TelefoneCelular = (''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x+''+x);
                _usuario.DataNascimento = new Date();
                _usuario.Nome = (_source.nomes[Math.floor((Math.random() * 4) + 1)]);
                _usuario.Endereco = CommonEnderecoFactory.Obter(x);
                _source.pedidos.push(_usuario);
            }
        };
        _command.PopularUsuarios();

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Obter = function (ID) {
            return angular.element.grep(_source.pedidos, function (_usuario) {
                return _usuario.ID == ID;
            })[0];
        };

        _factory.ObterPorEndereco = function (ID) {
            return angular.element.grep(_source.pedidos, function (_usuario) {
                return _usuario.Endereco.ID == ID;
            })[0];
        };

        _factory.ObterTodos = function () {
            return _source.pedidos;
        };

        return _factory;
    }

    angular.module('common-usuario.factory', [])
        .factory('CommonUsuarioFactory', CommonUsuarioFactory);
})();