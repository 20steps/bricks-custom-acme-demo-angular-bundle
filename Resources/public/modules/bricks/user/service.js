'use strict';

angular.module('bricks.user')

    .service('UserService',
        ['MODULE_BRICKS_USER', '$log', '$rootScope', 'bricksPublicRestangularService', '$q', 'bricksAuthenticationService',
            function (MODULE_BRICKS_USER, $log, $rootScope, bricksPublicRestangularService, $q, bricksAuthenticationService) {

                $log.debug('UserService');

                function findUserById(id) {
                    $log.debug("UserService.findUserById",id);
                    var deferred = $q.defer();

                    bricksPublicRestangularService.one('user/id/'+id+'.json').get().then(function (result) {
                        $log.debug('UserService.findUserById succeded: ', result);
                        deferred.resolve(result.data.user);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function findOneByUsername(username) {
                    $log.debug("UserService.findOneByUsername",username);
                    var deferred = $q.defer();

                    bricksPublicRestangularService.one('user/username/'+username+'.json').get().then(function (result) {
                        $log.debug('UserService.findOneByUsername succeded: ', result);
                        deferred.resolve(result.data.user);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                return {
                    findUserById: findUserById,
                    findOneByUsername: findOneByUsername,
                }
            }
        ]
    )
;