'use strict';

angular.module('bricks.notification', []
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_NOTIFICATION', {
        i18nPart: 'bricks/notification'
    })

    .config(['MODULE_BRICKS_NOTIFICATION', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_NOTIFICATION,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_NOTIFICATION.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_NOTIFICATION','$translate','$log',
        function(MODULE_BRICKS_NOTIFICATION,$translate,$log) {
            //$translate.refresh();
            $log.debug('bricks.notification: run()');
        }]
    )

;
