'use strict';

angular.module('bricks.utils',
        [
            'ngSanitize'
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_UTILS', {
        i18nPart: 'bricks/utils',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/utils/'
    })

    .config(['MODULE_BRICKS_UTILS', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_UTILS,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_UTILS.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_UTILS','$translate','$log',
        function(MODULE_BRICKS_UTILS,$translate,$log) {
            //$translate.refresh();

            $log.debug('bricks.utils: run()');

        }]
    )

;
