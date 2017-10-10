(function () {
    'use strict';

    angular.module('common.directive',
        [
            'dctv-input',
            'dctv-motor-busca-carro.directive',
            'dctv-lista-combo.directive',
            'dctv-painel-economize.directive',
            'dctv-filtro.directive',
            'dctv-paginacao.directive',
            'dctv-ordenador.directive',
            'dctv-anuncio-carro.directive',
            'dctv.geo-codificador'
        ]
    );

})();
