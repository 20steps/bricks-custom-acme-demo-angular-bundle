'use strict';

angular.module('bricks.search')

    .service('SearchService',
        ['MODULE_BRICKS_SEARCH', '$log', '$rootScope', '$q', 'bricksAuthenticatedRestangularService', 'bricksPublicRestangularService',
            function (MODULE_BRICKS_SEARCH, $log, $rootScope, $q, bricksAuthenticatedRestangularService, bricksPublicRestangularService) {

                $log.debug('SearchService');


                return {

                }
            }
        ]
    )
;