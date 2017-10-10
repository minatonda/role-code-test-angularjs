(function () {
    'use strict';

    angular.module('dctv-anuncio-carro.directive', [])
        .directive('dctvAnuncioCarro', dctvAnuncioCarro);

    /** @ngInject */
    function dctvAnuncioCarro(lodash, $filter) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                fonte: '=',
                moeda: '=',
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/dctv-anuncio-carro/dctv-anuncio-carro.tpl.html',
            link: function (scope, element, attrs) {

                scope.obterTituloAnuncio = obterTituloAnuncio;
                scope.obterDescricaoAnuncio = obterDescricaoAnuncio;
                scope.obterDetalhes = obterDetalhes;
                scope.obterPreco = obterPreco;
                scope.obterCodigoTaxa = obterCodigoTaxa;
                scope.obterNumeroParcelas = obterNumeroParcelas;
                scope.obterCaracteristicasFisicas = obterCaracteristicasFisicas;
                scope.obterCaracteristicas = obterCaracteristicas;
                scope.obterIconeCaracteristicaFisica = obterIconeCaracteristicaFisica;
                scope.obterTituloCaracteristica = obterTituloCaracteristica;
                scope.obterValorCaracteristica = obterValorCaracteristica;
                scope.obterDesconto = obterDesconto;
                scope.obterPrecoDesconto = obterPrecoDesconto;
                scope.obterImagem = obterImagem;

                var _verDetalhes = false;

                function obterMoeda() {
                    return scope.moeda;
                }

                function obterDetalhes() {
                    return scope.fonte.detalhes;
                }

                function obterTituloAnuncio() {
                    return scope.fonte.tituloAnuncio;
                };

                function obterCaracteristicasFisicas() {
                    return scope.fonte.caracteristicasFisicas;
                };

                function obterCaracteristicas() {
                    return scope.fonte.caracteristicas;
                };

                function obterDescricaoAnuncio() {
                    return scope.fonte.descricao;
                };

                function obterImagem() {
                    return scope.fonte.imagem;
                }

                function obterPreco(retornarValor) {
                    if (retornarValor) {
                        return scope.fonte.preco;
                    }
                    else {
                        if (obterMoeda()) {
                            return $filter('currency')(scope.fonte.preco * obterMoeda().valor, obterMoeda().simbolo + ' ', 2);
                        } else {
                            return $filter('currency')(scope.fonte.preco, 'R$', 2);
                        }
                    }
                };

                function obterCodigoTaxa() {
                    return scope.fonte.codigoTaxa;
                };

                function obterNumeroParcelas() {
                    return scope.fonte.detalhesPagamento.numeroParcelas + 'x';
                };

                function obterTituloCaracteristica(caracteristica) {
                    return caracteristica.titulo;
                };

                function obterValorCaracteristica(caracteristica) {
                    if (caracteristica.valor === true || caracteristica.valor === false) {
                        return '';
                    }
                    else {
                        return caracteristica.valor;
                    }
                };

                function obterDesconto() {
                    return scope.fonte.detalhesPagamento.desconto;
                };

                function obterPrecoDesconto() {
                    var precoDesconto = obterPreco(true) - (parseFloat('0.' + scope.fonte.detalhesPagamento.desconto) * obterPreco(true));
                    if (obterMoeda()) {
                        return $filter('currency')(precoDesconto * obterMoeda().valor, obterMoeda().simbolo + ' ', 2);
                    } else {
                        return $filter('currency')(precoDesconto, 'R$', 2);
                    }
                }

                scope.alternarDetalhes = alternarDetalhes;
                scope.eDetalhesVisivel = eDetalhesVisivel;
                function alternarDetalhes() {
                    _verDetalhes = !_verDetalhes;
                }

                function eDetalhesVisivel() {
                    return !_verDetalhes;
                }

                function obterIconeCaracteristicaFisica(caracteristica) {

                    var _imagens = [
                        {titulo: 'Portas', classe: 'portas'},
                        {titulo: 'Pessoas', classe: 'passageiro'},
                        {titulo: 'Malas', classe: 'bagagem'},
                        {titulo: 'Ar Condicionado', classe: 'ar-condicionado'},
                        {titulo: 'Câmbio Automático', classe: 'cambio-automatico'},
                        {titulo: 'Câmbio Manual', classe: 'cambio-manual'},
                    ];

                    return lodash.find(_imagens, function (imagem) {
                        return imagem.titulo == caracteristica.titulo || imagem.titulo == caracteristica.titulo + ' ' + caracteristica.valor;
                    }).classe;
                };

            }
        }

    }


})
();
