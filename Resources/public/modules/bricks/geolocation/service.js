'use strict';

angular.module('bricks.geolocation')

    .service('GeolocationService',
        ['MODULE_BRICKS_GEOLOCATION', '$log', '$rootScope', 'bricksPublicRestangularService', 'bricksAuthenticatedRestangularService', '$q', '$geolocation',
            function (MODULE_BRICKS_GEOLOCATION, $log, $rootScope, bricksPublicRestangularService, bricksAuthenticatedRestangularService, $q, $geolocation) {

                $log.debug('GeolocationService');

                // best effort, combining browser based and ip based determinination of position with reverse geocoding
                function get() {
                    $log.debug('GeolocationService.get');
                    var deferred = $q.defer();
                    var restangularService = $rootScope.user?bricksAuthenticatedRestangularService:bricksPublicRestangularService;
                    if (document.location.protocol=='https:') {
                        $log.debug('GeolocationService.get: detected https origin, trying full geolocation');
                        $geolocation.getCurrentPosition({
                            timeout: 60000
                        }).then(function (position) {
                            $log.debug('GeolocationService.get: $geolocation succeeded', position);
                            restangularService.one('geolocation/reverse.json').get({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }).then(function (result) {
                                $log.debug('GeolocationService.get: reverse geocoding succeeded', result);
                                deferred.resolve(result.data.location);
                            }, function (error) {
                                $log.error('GeolocationService.get: reverse geocoding failed', error);
                                deferred.resolve({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                });
                            });
                        }, function (error) {
                            $log.warn('GeolocationService.get: $geolocation failed, trying reverse IP based geocoding', error);
                            restangularService.one('geolocation/geoip.json').get().then(function (result) {
                                $log.debug('GeolocationService.get: geoip succeeded', result);
                                deferred.resolve(result.data.location);
                            }, function (error) {
                                $log.error('GeolocationService.get: geoip failed', error);
                                deferred.reject(error);
                            });
                        });
                    } else {
                        $log.debug('GeolocationService.get: detected http origin, trying reverse IP based geocoding only');
                        restangularService.one('geolocation/geoip.json').get().then(function (result) {
                            $log.debug('GeolocationService.get: geoip  succeeded', result);
                            deferred.resolve(result.data.location);
                        }, function (error) {
                            $log.error('GeolocationService.get: geoip failed', error);
                            deferred.reject(error);
                        });
                    }
                    return deferred.promise;
                }


                function reverse(lat,lng) {
                    $log.debug('GeolocationService.reverse');
                    var deferred = $q.defer();
                    var restangularService = $rootScope.user?bricksAuthenticatedRestangularService:bricksPublicRestangularService;
                    restangularService.one('geolocation/reverse.json').get({lat:lat, lng:lng}).then(function (result) {
                        $log.debug('GeolocationService.reverse succeeded',result);
                        deferred.resolve(result.data.location);
                    }, function (error) {
                        $log.error('GeolocationService.reverse failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function geoposition() {
                    $log.debug('GeolocationService.geoposition');
                    var deferred = $q.defer();
                    $geolocation.getCurrentPosition({
                        timeout: 60000
                    }).then(function(position) {
                        $log.debug('GeolocationService.geoposition succeeded',position);
                        deferred.resolve(position);
                    },function(error) {
                        $log.error('GeolocationService.geoposition failed',error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function geoip() {
                    $log.debug('GeolocationService.geoip');
                    var deferred = $q.defer();
                    var restangularService = $rootScope.user?bricksAuthenticatedRestangularService:bricksPublicRestangularService;
                    restangularService.one('geolocation/geoip.json').get().then(function (result) {
                        $log.debug('GeolocationService.geoip succeeded',result);
                        deferred.resolve(result.data.location);
                    }, function (error) {
                        $log.error('GeolocationService.geoip failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                return {
                    get: get,
                    geoip: geoip,
                    geoposition: geoposition,
                    reverse: reverse
                }
            }
        ]
    )
;