(function () {
    'use strict';

    angular
        .module('front-end').constant(
        'API', {
            LISTA: {
                CARROS: 'lista_carros',
                MODULOS: 'lista_modulos',
                COMBUSTIVEIS:'lista_combustiveis'
            }
        }
    );

})();
