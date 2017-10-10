(function () {
    'use strict';

    /** @ngInject */
    function CommonPedidoFactory(CommonEnderecoFactory, CommonUsuarioFactory, CommonProdutoFactory) {

        var _source = {};
        var _command = {};

        _source.pedidos = [];
        _command.PopularPedidos = function () {
            for (var x = 0; x <= 30; x++) {
                var _pedido = {};
                _pedido.ID = x;
                _pedido.Endereco = CommonEnderecoFactory.Obter(x);
                _pedido.Usuario = CommonUsuarioFactory.Obter(x);
                _pedido.Itens = [];
                for (var y = 0; y <= (Math.floor((Math.random() * 4) + 1)); y++) {
                    var _item = {};
                    _item.Produto = CommonProdutoFactory.Obter((Math.floor((Math.random() * 4) + 1)));
                    _item.Quantidade = (Math.floor((Math.random() * x) + 1))
                    _pedido.Itens.push(_item);
                }
                _source.pedidos.push(_pedido);
            }
        };
        _command.PopularPedidos();

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Obter = function (ID) {
            return angular.element.grep(_source.pedidos, function (_pedido) {
                return _pedido.ID == ID;
            })[0];
        };

        _factory.ObterPorEndereco = function (ID) {
            return angular.element.grep(_source.pedidos, function (_pedido) {
                return _pedido.Endereco.ID == ID;
            })[0];
        };

        _factory.ObterPorUsuario = function (ID) {
            return angular.element.grep(_source.pedidos, function (_pedido) {
                return _pedido.Usuario.ID == ID;
            })[0];
        };

        _factory.ObterTodos = function () {
            return _source.pedidos;
        };

        return _factory;
    }

    angular.module('common-pedido.factory', [])
        .factory('CommonPedidoFactory', CommonPedidoFactory);
})();