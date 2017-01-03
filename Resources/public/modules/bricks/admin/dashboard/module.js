'use strict';

angular.module('bricks.admin.dashboard', [
])

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_ADMIN_DASHBOARD', {
        i18nPart: 'bricks/admin/dashboard',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/admin/dashboard/'
    })

    .config(['MODULE_BRICKS_ADMIN_DASHBOARD', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_ADMIN_DASHBOARD,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_APP_ADMIN_DASHBOARD.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_ADMIN_DASHBOARD','$translate','$log',
        function(MODULE_BRICKS_ADMIN_DASHBOARD,$translate,$log) {
            //$translate.refresh();
            $log.debug('bricks.admin.dashboard: run()');
        }]
    )

;
