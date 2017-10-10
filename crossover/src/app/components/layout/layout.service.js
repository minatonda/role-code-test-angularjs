(function () {
    'use strict';

    angular.module('layout.service', [])
        .service('LayoutService', LayoutService);

    /** @ngInject */
    function LayoutService() {

        var _service = this;

        var _layoutLeft = {element: null, selector: '#layout-left'};
        var _layoutRight = {element: null, selector: '#layout-right'};
        var _layoutLoading = {element: null, selector: '.loading-screen'};

        _service.Start = function () {
            var _intervallWhenStarting = setInterval(function () {
                if (_layoutLeft.element && _layoutRight.element && _layoutLoading.element) {
                    clearInterval(_intervallWhenStarting);
                }
                else {
                    if ($(_layoutLeft.selector).size() > 0) {
                        _layoutLeft.element = $(_layoutLeft.selector);
                    }
                    if ($(_layoutRight.selector).size() > 0) {
                        _layoutRight.element = $(_layoutRight.selector);
                    }
                    if ($(_layoutLoading.selector).size() > 0) {
                        _layoutLoading.element = $(_layoutLoading.selector);
                    }
                }
            }, 500);
        };

        _service.IsReadyLeft = function () {
            return _layoutLeft.element ? true : false;
        };

        _service.IsReadyRight = function () {
            return _layoutRight.element ? true : false;
        };

        _service.IsReady = function () {
            if (_service.IsReadyRight() && _service.IsReadyLeft()) {
                return true;
            }
            else {
                return false;
            }
        };

        _service.left = {
            hide: function () {
                $(_layoutLeft.selector).removeClass('active');
            },
            show: function () {
                $(_layoutLeft.selector).addClass('active');
            },
            toggle: function () {
                if (_service.left.isVisible()) {
                    _service.left.hide();
                }
                else {
                    if (_service.right.isVisible()) {
                        _service.right.hide();
                    }
                    _service.left.show();
                }
            },
            isVisible: function () {
                return $(_layoutLeft.selector).hasClass('active');
            }
        };

        _service.right = {
            hide: function () {
                $(_layoutRight.selector).removeClass('active');
            },
            show: function () {
                $(_layoutRight.selector).addClass('active');
            },
            toggle: function () {
                if (_service.right.isVisible()) {
                    _service.right.hide();
                }
                else {
                    if (_service.left.isVisible()) {
                        _service.left.hide();
                    }
                    _service.right.show();
                }
            },
            isVisible: function () {
                return $(_layoutRight.selector).hasClass('active');
            }
        };

        _service.loader = {
            hide: function () {
                tryHideLoading();
            },
            show: function () {
                tryShowLoader();
            },
        };


        var tryHideLoading = function () {
            if (_layoutLoading.element) {
                $(_layoutLoading.selector).fadeOut(300);
            }
            else {
                setTimeout(function () {
                    tryHideLoading();
                }, 300);
            }
        };

        var tryShowLoader = function () {
            if (_layoutLoading.element) {
                $(_layoutLoading.selector).fadeIn(300);
            }
            else {
                setTimeout(function () {
                    tryShowLoader();
                }, 300);
            }
        };


    }


})();
