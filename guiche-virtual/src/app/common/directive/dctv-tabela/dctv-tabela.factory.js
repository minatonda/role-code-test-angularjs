(function () {
    'use strict';
    angular.module('dctv-tabela.factory', [])
        .factory('DctvTabelaFactory', DctvTabelaFactory);

    /** @ngInject */
    function DctvTabelaFactory() {

        var _factory = this;
        _factory.Coluna = Coluna;
        _factory.Tabela = Tabela;

        function Coluna(titulo, propriedade, largura, opcoes) {

            this.titulo = titulo;
            this.propriedade = propriedade;
            this.largura = angular.isNumber(largura) ? largura : undefined;
            var _opcoes = angular.isObject(largura) ? largura : opcoes;
            if (_opcoes) {
                for (var chave in _opcoes) {
                    this[chave] = _opcoes[chave];
                }
            }

            return this;

        }

        function Tabela(titulo, colunas, linhas, opcoes) {

            this.titulo = titulo;
            this.colunas = colunas;
            this.linhas = linhas;
            this.opcoes = {};
            if (opcoes) {
                for (var chave in opcoes) {
                    this.opcoes[chave] = opcoes[chave];
                }
            }

            return this;

        }

        return _factory

    };

})();
