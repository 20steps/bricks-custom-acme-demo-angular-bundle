'use strict';

angular.module('bricks.app',
        [
            'bricks.app.admin',
            'bricks.content',
            'bricks.event',
            'bricks.notification',
            'bricks.user',
            'bricks.utils',
            'bricks.wamp'
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_APP', {
        i18nPart: 'services',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/'
    })

    .config(['MODULE_BRICKS_APP', '$translatePartialLoaderProvider',
        function (MODULE_BRICKS_APP,$translatePartialLoaderProvider) {
            // load i18n translations from i18n subdirectory
            // $translatePartialLoaderProvider.addPart(MODULE_BRICKS_APP.i18nPart);
        }]
    )

    .run(['MODULE_BRICKS_APP','$translate','$log',
        function(MODULE_BRICKS_APP,$translate,$log) {
            //$translate.refresh();
            $log.debug('bricks.app: run()','0.1');
        }]
    )

    .filter('filterMediaByTags', function() {
        return function (media, tags) {
            return media.filter(function (mediaItem) {

                for (var i in tags) {
                    if (mediaItem.tags.indexOf(tags[i]) != -1) {
                        return true;
                    }
                }
                return false;
            });
        }
    });

;
