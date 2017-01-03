'use strict';

angular.module('bricks.user',
        [
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_USER', {
        i18nPart: 'bricks/user',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/user/'
    })

    .config(['MODULE_BRICKS_USER', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_USER,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_USER.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_USER','$translate','$log',
        function(MODULE_BRICKS_USER,$translate,$log) {
            //$translate.refresh();

            $log.debug('bricks.user: run()');

        }]
    )

;
