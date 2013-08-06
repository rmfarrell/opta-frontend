'use strict';

/* Directives */

/*
angular.module('ccnut.jquery-ui.directives')
    .directive('ccnutJqueryUiSlider', ['ccnut.config', 'logger', function (ccnutConfig, logger) {
        return {
            restrict: 'AC',
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ngModelController) {

                if (!window.$ || !window.$.fn || !window.$.fn.datepicker) {
                    return logger.warn('ccnutJqueryUiSlider directive skipped: slider function from jQuery UI library not available');
                }

                // Get options
                var options = angular.extend({}, scope.$eval(iAttrs.ccnutJqueryUiSlider));

                // Initialize slider
                iElement.slider(options);

                // Update model on slide event
                iElement.on('slide', function (event, ui) {
                    ngModelController.$setViewValue(ui.value);
                    scope.$apply();
                });

                // Update slider when view needs to be updated
                ngModelController.$render = function () {
                    var value = (ngModelController.$viewValue || 0);
                    iElement.slider('value', value);
                };

            }
        };
    }]);*/