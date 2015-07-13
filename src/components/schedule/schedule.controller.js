'use strict';

angular.module('stretchTucson')
    .controller('scheduleCtrl', ['$scope', '$routeParams', 'scheduleService',
        function($scope, $routeParams, scheduleService) {

            console.log($routeParams);

            if ($routeParams.studioID) {
                scheduleService.getSchedule($routeParams.studioID, $routeParams.studio)
                    .then(function(data) {
                        $scope.week = data.results.collection2;
                    });
            } else {
                $scope.studioName = $routeParams.studio;
                $scope.locations = scheduleService.getStudioData($routeParams.studio);
            }
        }
    ]);
