'use strict';

angular.module('stretchTucson')
    .directive('bgSelect', ['$compile', 'scheduleService',
        function($compile, scheduleService) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    console.log(element);
                    var url = scheduleService.studioName;
                    console.log(scheduleService);
                    console.log('URL', url);

                    element.css({
                        'background-image': 'url(images/' + url + '_lg.jpg)',
                        'background-size': 'cover'
                    });
                }
            };
        }
    ]);
