'use strict';


angular.module('stretchTucson', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: './components/home/home.view.html',
                controller: 'homeCtrl'
            })
            .when('/schedule/:studio/:studioID', {
                templateUrl: './components/schedule/schedule.view.html',
                controller: 'scheduleCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
