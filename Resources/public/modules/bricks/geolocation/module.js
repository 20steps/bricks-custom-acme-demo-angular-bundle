'use strict';

angular.module('bricks.geolocation',
        [
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_GEOLOCATION', {
        i18nPart: 'bricks/geolocation',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/geolocation/'
    })

    .run(['MODULE_BRICKS_GEOLOCATION', '$log',
        function(MODULE_BRICKS_GEOLOCATION, $log) {
            $log.debug('bricks.geolocation: run()');
        }]
    )

;
