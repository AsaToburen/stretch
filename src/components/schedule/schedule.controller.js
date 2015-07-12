'use strict';

angular.module('stretchTucson')
    .controller('scheduleCtrl', ['$scope', '$routeParams', 'scheduleService',
        function($scope, $routeParams, scheduleService) {

            console.log($routeParams.studioID);

            scheduleService.getSchedule($routeParams.studioID)
                .then(function(data) {
                    $scope.sunday = data.results.undefined[6];
                    $scope.monday = data.results.undefined[0];
                    $scope.tuesday = data.results.undefined[1];
                    
                });



        }
    ]);
