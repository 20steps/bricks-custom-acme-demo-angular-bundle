'use strict';

angular.module('bricks.event')
    .service('EventService',
        ['MODULE_BRICKS_EVENT', '$log', '$translate', 'bricksPublicRestangularService', '$q',
            function (MODULE_BRICKS_EVENT, $log, $translate, bricksPublicRestangularService, $q) {

                $log.debug('EventService');

                function getList() {
                    $log.debug('EventService.getList');

                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('event/event.json').get().then(function(result) {
                        $log.debug('EventService.getList succeeded: ', result);
                        var events = result.data.events;
                        deferred.resolve(events);
                    }, function (error) {
                        $log.error('EventService.getList failed: ', error);
                        deferred.reject(error);
                    }).finally(function() {
                    });
                    return deferred.promise;
                }

                return {
                    getList: getList
                }
            }
        ]
    )
;