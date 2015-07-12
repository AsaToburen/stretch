'use strict';

angular.module('stretchTucson')
    .factory('scheduleService', ['$http', '$q', '$log',
        function($http, $q, $log) {

            var scheduleObj = {

                getSchedule: function(studioID) {

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
            };

            return scheduleObj;

        }
    ]);
