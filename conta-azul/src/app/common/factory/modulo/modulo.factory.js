(function () {
    'use strict';
    angular.module('modulo.factory', [])
        .factory('ModuloFactory', ModuloFactory);

    /** @ngInject */
    function ModuloFactory($q) {

        var factory = this;
        factory.obterTodos = obterTodos;


        function obterTodos() {
            var deffered = $q.defer();
            setTimeout(function () {
                deffered.resolve([
                    {
                        nome: 'Carro - Listar - Proposto',
                        state: 'app.carro.listar-proposto',
                        familia: 'carros',
                        tipo: 'listar',
                        icones: ['fa fa-car', 'fa fa-list'],
                        permiteAnonimo: false
                    },
                    {
                        nome: 'Carro - Listar',
                        state: 'app.carro.listar',
                        familia: 'carros',
                        tipo: 'listar',
                        icones: ['fa fa-car', 'fa fa-list'],
                        permiteAnonimo: false
                    },
                    {
                        nome: 'Carro - Adicionar',
                        state: 'app.carro.adicionar',
                        familia: 'carros',
                        tipo: 'adicionar',
                        icones: ['fa fa-car', 'fa fa-plus'],
                        permiteAnonimo: false
                    },
                    {
                        nome: 'Carro - Atualizar',
                        state: 'app.carro.atualizar',
                        tipo: 'atualizar',
                        icones: ['fa fa-car', 'fa fa-pencil'],
                        permiteAnonimo: false
                    },
                    {
                        nome: 'Home',
                        state: 'app.main',
                        familia: 'main',
                        tipo: 'padrao',
                        icones: ['fa fa-home'],
                        permiteAnonimo: false
                    },
                ]);
            }, 1000);
            return deffered.promise;
        };

        return factory

    };

})();
