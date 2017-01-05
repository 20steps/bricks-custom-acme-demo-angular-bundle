'use strict';

angular.module('bricks.event', [])

	// infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_EVENT', {
        i18nPart: 'bricks/event'
    })

	.config(['MODULE_BRICKS_EVENT','$translatePartialLoaderProvider','$stateProvider',
        function (MODULE_BRICKS_EVENT,$translatePartialLoaderProvider, $stateProvider) {
        // load i18n translations from i18n subdirectory
        //$translatePartialLoaderProvider.addPart(MODULE_BRICKS_EVENT.i18nPart);

    }])

    .run(['MODULE_BRICKS_EVENT','$translate',
        function(MODULE_BRICKS_EVENT,$translate) {
    	//$translate.refresh();
    }])
;