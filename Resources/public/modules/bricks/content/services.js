'use strict';

angular.module('bricks.content')
    .service('ContentService',
        ['MODULE_BRICKS_CONTENT', '$log', '$translate', 'bricksPublicRestangularService', '$q', 'bricksContentService',
            function (MODULE_BRICKS_CONTENT, $log, $translate, bricksPublicRestangularService, $q, bricksContentService) {

                $log.debug('ContentService');

                function findPage(selector, published) {
                    $log.debug('ContentService.findNode', selector);

                    var context = {
                        published: published
                    };

                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('magazine/page/'+selector+'.json').get(context).then(function(result) {
                        $log.debug('ContentService.findNode succeeded: ', result);
                        var page = result.data.page;
                        deferred.resolve(page);
                    }, function (error) {
                        $log.error('ContentService.findNode failed: ', error);
                        deferred.reject(error);
                    }).finally(function() {
                    });
                    return deferred.promise;
                }

                function findPost(slug, published) {
                    $log.debug('ContentService.findPost', slug);

                    var context = {
                        published: published
                    };

                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('magazine/post/'+slug+'.json').get(context).then(function(result) {
                        $log.debug('ContentService.findNode succeeded: ', result);
                        var post = result.data.post;
                        deferred.resolve(post);
                    }, function (error) {
                        $log.error('ContentService.findNode failed: ', error);
                        deferred.reject(error);
                    }).finally(function() {
                    });
                    return deferred.promise;
                }

                function findAllNodesByType(type) {
                    $log.debug('ContentService.findAllNodesByType', type);
                    var deferred = $q.defer();
                    bricksPublicRestangularService.one('magazine/'+type+'.json').get().then(function(result) {
                        $log.debug('ContentService.findNode succeeded: ', result);
                        var nodes = result.data.nodes;
                        deferred.resolve(nodes);
                    }, function (error) {
                        $log.error('ContentService.findNode failed: ', error);
                        deferred.reject(error);
                    }).finally(function() {
                    });
                    return deferred.promise;
                }

                function findOnePageBySelector(selector) {
                    $log.debug('ContentService.findOnePageBySelector', selector);

                    var content = {
                        state: 'loading',
                        error: null,
                        node: null
                    };

                    return bricksContentService.findNodeByTypeAndSlug('page', selector, true).then(function (result) {
                        $log.debug('retrieved node of type page', selector, result);
                        content.node = result.node;
                        content.state = 'success';
                        return content;
                    }, function (error) {
                        $log.error('failed to retrieve node of type page', selector, error);
                        content.error = error;
                        content.state = 'error';
                        return content;
                    });
                }

                function findOnePostBySelector(selector) {
                    $log.debug('ContentService.findOnePostBySelector', selector);

                    var content = {
                        state: 'loading',
                        error: null,
                        node: null
                    };

                    return bricksContentService.findNodeByTypeAndSlug('post', selector, true).then(function (result) {
                        $log.debug('retrieved node of type post ', selector, result);
                        content.node = result.node;
                        content.state = 'success';
                        return content;
                    }, function (error) {
                        $log.error('failed to retrieve node of type post', selector, error);
                        content.error = error;
                        content.state = 'error';
                        return content;
                    });
                }

                return {
                    findPage:findPage,
                    findPost:findPost,
                    findAllNodesByType:findAllNodesByType,
                    findOnePageBySelector: findOnePageBySelector,
                    findOnePostBySelector: findOnePostBySelector
                }
            }
        ]
    )
;