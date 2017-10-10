(function () {
    'use strict';

    /** @ngInject */
    function CommonProdutoFactory() {

        var _source = {};
        var _command = {};

        _source.produtos = [
            {
                ID:1,
                Nome:'Televisão',
                ImagemSRC:'http://www.blogolandialtda.com.br/img-upload/images/smart-tv-da-samsung.jpg',
                Descricao:'Aparelho que transmite gravações.'
            },
            {
                ID:2,
                Nome:'Notebook',
                ImagemSRC:'http://blogbringit.com.br/wp-content/uploads/2014/09/notebook_animacao_04.png',
                Descricao:'Computador Portátil.'
            },
            {
                ID:3,
                Nome:'SmartPhone',
                ImagemSRC:'http://i.mlcdn.com.br/1500x1500/smartphone-asus-zenfone-2-16gb-dual-chip-4gcam.-13mp-selfie-5mp-tela-5.5-34-intel-quad-core-214562700.jpg    ',
                Descricao:'Android 6.0'
            },
            {
                ID:4,
                Nome:'Gelareira',
                ImagemSRC:'http://i.mlcdn.com.br/1500x1500/geladeira-refrigerador-electrolux-frost-freeduplex-380l-inox-painel-blue-touch-dw42x-010059200.jpg',
                Descricao:'Baixo Consumo'
            }
        ];

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Obter = function (ID) {
            return angular.element.grep(_source.produtos, function (_produto) {
                return _produto.ID == ID;
            })[0];
        };

        _factory.ObterTodos = function () {
            return _source.produtos;
        };

        return _factory;
    }

    angular.module('common-produto.factory', [])
        .factory('CommonProdutoFactory', CommonProdutoFactory);
})();