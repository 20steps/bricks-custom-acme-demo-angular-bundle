'use strict';

angular.module('bricks.content', [])

	// infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_CONTENT', {
        i18nPart: 'bricks/content'
    })

	.config(['MODULE_BRICKS_CONTENT','$translatePartialLoaderProvider','$stateProvider',
        function (MODULE_BRICKS_CONTENT,$translatePartialLoaderProvider, $stateProvider) {
        // load i18n translations from i18n subdirectory
        //$translatePartialLoaderProvider.addPart(MODULE_BRICKS_CONTENT.i18nPart);

    }])

    .run(['MODULE_BRICKS_CONTENT','$translate',
        function(MODULE_BRICKS_CONTENT,$translate) {
    	//$translate.refresh();
    }])
;