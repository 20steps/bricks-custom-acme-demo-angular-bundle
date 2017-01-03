'use strict';

angular.module('bricks.app.admin',
        [
            'bricks.admin.dashboard',
            'bricks.admin.user'
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_APP_ADMIN', {
        i18nPart: 'bricks/admin',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/admin/'
    })

    .config(['MODULE_BRICKS_APP_ADMIN', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_APP_ADMIN,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_APP_ADMIN.i18nPart);
        }]
    )


    .run(['MODULE_BRICKS_APP_ADMIN','$translate','$log',
        function(MODULE_BRICKS_APP_ADMIN,$translate,$log) {
            //$translate.refresh();
            $log.debug('bricks.app.admin: run()');
        }]
    )

;
