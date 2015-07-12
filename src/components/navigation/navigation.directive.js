'use strict';

angular.module('stretchTucson')
    .directive('navigation', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: './components/navigation/navigation.partial.html',
            replace: true,
            scope: true
        };
    });
