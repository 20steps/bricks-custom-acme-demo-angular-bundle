'use strict';

angular.module('bricks.admin.user', [
])

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_ADMIN_USER', {
        i18nPart: 'bricks/admin/user',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/admin/user/'
    })

    .config(['MODULE_BRICKS_ADMIN_USER', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_ADMIN_USER,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_ADMIN_USER.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_ADMIN_USER','$translate','$log',
        function(MODULE_BRICKS_ADMIN_USER,$translate,$log) {
            //$translate.refresh();

            $log.debug('bricks.admin.user: run()');

        }]
    )

;
