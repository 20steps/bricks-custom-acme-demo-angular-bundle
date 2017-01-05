'use strict';

angular.module('bricks.app.notification',
        [
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_APP_NOTIFICATION', {
        i18nPart: 'services',
        templatePrefix: '/bundles/twentystepsbricksacmedemoangularjs/modules/bricks/notification/'
    })

    .config(['MODULE_BRICKS_APP_NOTIFICATION', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_APP_NOTIFICATION,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_APP_NOTIFICATION.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_APP_NOTIFICATION','$translate','$log',
        function(MODULE_BRICKS_APP_NOTIFICATION,$translate,$log) {
            //$translate.refresh();

            $log.debug('bricks.app.notification: run()');

        }]
    )

;
