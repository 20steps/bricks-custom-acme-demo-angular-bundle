'use strict';

angular.module('bricks.newsletter')

    .service('NewsletterService',
        ['MODULE_BRICKS_NEWSLETTER', '$log', '$rootScope', 'bricksKernel', 'bricksPublicRestangularService', 'bricksAuthenticatedRestangularService', '$q',
            function (MODULE_BRICKS_NEWSLETTER, $log, $rootScope, bricksKernel, bricksPublicRestangularService, bricksAuthenticatedRestangularService, $q) {

                $log.debug('NewsletterService');

                function subscribe(registration) {
                    $log.debug('NewsletterService.subscribe',registration);
                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('/newsletter/subscribe.json').customPOST(registration).then(function (result) {
                        $log.debug('NewsletterService.subscribe succeeded',result);
                        deferred.resolve(result.data.flash);
                    }, function (error) {
                        $log.error('NewsletterService.subscribe failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                return {
                    subscribe: subscribe
                }
            }
        ])
;