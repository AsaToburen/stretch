'use strict';

angular.module('stretchTucson')
    .factory('scheduleService', ['$http', '$q', '$log',
        function($http, $q, $log) {

            var scheduleObj = {

                studioName: '',

                getSchedule: function(studioID, studioName) {

                    scheduleObj.studioName = studioName;

                    var deferred = $q.defer();

                    $http.jsonp('https://www.kimonolabs.com/api/' + studioID + '?apikey=FvbZrOXO1Iy2DmKWt2m7VoTaXGkDjJ36&callback=JSON_CALLBACK"')
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(e) {
                            $log.log('Error', e);
                            deferred.reject(e);
                        });
                    return deferred.promise;
                },
                getStudioData: function(studioName) {
                    
                    scheduleObj.studioName = studioName;

                    console.log(studioName);
                    var studios = {
                        'oasis': function() {
                            var studioLocations = {
                                central: '2zze09i2',
                                downtown: '44lsg34a',
                                east: 'bozs9rhy'
                            };
                            return studioLocations;
                        }
                    };
                    console.log(studios['oasis']());
                    return studios[studioName]();
                },
            };
            return scheduleObj;
        }
    ]);
