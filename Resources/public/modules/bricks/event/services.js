'use strict';

angular.module('bricks.event')
    .service('EventService',
        ['MODULE_BRICKS_EVENT', '$log', '$translate', 'bricksPublicRestangularService', '$q', 'bricksContentService',
            function (MODULE_BRICKS_EVENT, $log, $translate, bricksPublicRestangularService, $q, bricksContentService) {

                $log.debug('EventService');

                function getList() {
                    $log.debug('EventService.getList');

                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('event/event.json').get(context).then(function(result) {
                        $log.debug('EventService.getList succeeded: ', result);
                        var page = result.data.page;
                        deferred.resolve(page);
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