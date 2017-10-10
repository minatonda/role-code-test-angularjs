(function () {
    'use strict';

    angular.module('dctv-motor-busca-carro.directive', ['dctv-motor-busca-carro.factory'])
        .directive('dctvMotorBuscaCarro', dctvMotorBuscaCarro);

    /** @ngInject */
    function dctvMotorBuscaCarro() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                aoRetornarBusca: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-motor-busca-carro/dctv-motor-busca-carro.tpl.html',
            link: function (scope, element, attrs) {

                scope.buscar = buscar;
                scope.devolverEmOutroLocal = true;

                var _valoresTituloAnuncio = ['Carro Econômico com AR', 'Carro Econômico sem AR'];
                var _valoresDescricao = ['Chevrolet Celta, Ford Fiesta, VW Gol, Fiat Pálio ou Similar', 'Chevrolet Captiva, Ford Fusion, VW Passat, Fiat Bravo ou Similar'];
                var _valoresDetalhes = [];
                var _valoresCodigoTaxa = ['IFMR'];
                var _valoresCaracteristicas = ['Quilometragem Livre', 'Seguro total do veículo', 'Seguro a terceiros', 'Taxas de serviços inclusas'];
                var _valoresImagem = ['assets/images/gol-g5.jpg', 'assets/images/sandero.jpg'];

                buscar();

                function obterIndiceRandomico(vetor) {
                    return vetor[obterNumeroRandomico(vetor.length) - 1];
                }

                function obterNumeroRandomico(maximo) {
                    return Math.floor((Math.random() * maximo) + 1);
                }

                function buscar(modelo) {

                    var _retorno = [];
                    for (var x = 0; x < obterNumeroRandomico(600); x++) {
                        var objeto = {
                            tituloAnuncio: obterIndiceRandomico(_valoresTituloAnuncio),
                            descricao: obterIndiceRandomico(_valoresDescricao),
                            detalhes: 'Super inclusive promocional - Km livre, seguro total do veículo (LDW), seguro a terceiros (SLI), taxas de serviços inclusas e 1 motorista adicional.',
                            imagem: obterIndiceRandomico(_valoresImagem),
                            codigoTaxa: obterIndiceRandomico(_valoresCodigoTaxa),
                            caracteristicasFisicas: [
                                {titulo: 'Portas', valor: 4},
                                {titulo: 'Pessoas', valor: obterNumeroRandomico(5)},
                                {titulo: 'Malas', valor: obterNumeroRandomico(5)},
                                {titulo: 'Ar Condicionado', valor: obterNumeroRandomico(2) == 2},
                                {titulo: 'Câmbio Automático', valor: obterNumeroRandomico(2) == 2},
                            ],
                            preco: parseFloat(obterNumeroRandomico(1000) + '.' + obterNumeroRandomico(99)),
                            detalhesPagamento: {
                                numeroParcelas: 10,
                                desconto: obterNumeroRandomico(2) == 2 ? obterNumeroRandomico(30) : undefined
                            }
                        };
                        objeto.caracteristicas = [];
                        for (var x = 0; x < obterNumeroRandomico(99); x++) {
                            var caracteristica = obterIndiceRandomico(_valoresCaracteristicas);
                            if (objeto.caracteristicas.indexOf(caracteristica) == -1) {
                                objeto.caracteristicas.push(caracteristica);
                            }
                        }
                        _retorno.push(objeto);
                    }
                    scope.aoRetornarBusca(_retorno);
                }

            }
        }

    }


})
();
