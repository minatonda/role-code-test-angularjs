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
            this.largura = largura;
            if (opcoes) {
                for (var chave in opcoes) {
                    this[chave] = opcoes[chave];
                }
            }

        }

        function Tabela(titulo, colunas, linhas, opcoes) {

            this.titulo = titulo;
            this.colunas = colunas;
            this.linhas = linhas;
            if (opcoes) {
                for (var chave in opcoes) {
                    this[chave] = opcoes[chave];
                }
            }

        }

        return _factory

    };

})();
