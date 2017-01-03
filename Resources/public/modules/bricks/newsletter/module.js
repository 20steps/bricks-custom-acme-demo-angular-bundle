'use strict';

angular.module('bricks.newsletter',
        [
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_NEWSLETTER', {
        i18nPart: 'bricks/newsletter',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/newsletter/'
    })

    .config(['MODULE_BRICKS_NEWSLETTER', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_NEWSLETTER,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_NEWSLETTER.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_NEWSLETTER','$translate','$log',
        function(MODULE_BRICKS_NEWSLETTER,$translate,$log) {
            //$translate.refresh();

            $log.debug('bricks.newsletter: run()');

        }]
    )

;
