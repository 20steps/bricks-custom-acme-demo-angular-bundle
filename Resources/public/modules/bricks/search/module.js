'use strict';

angular.module('bricks.search', [])

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_SEARCH', {
        i18nPart: 'bricks/search'
    })

    .config(['MODULE_BRICKS_SEARCH',
        function (MODULE_BRICKS_SEARCH) {
        }]
    )

    .run(['MODULE_BRICKS_SEARCH', '$log',
        function(MODULE_BRICKS_SEARCH, $log) {
            $log.debug('bricks.search: run()');

        }]
    )

;
