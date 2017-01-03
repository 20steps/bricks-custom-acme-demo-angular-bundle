'use strict';

angular.module('bricks.admin.user')

    .service('AdminUserService',
        ['MODULE_BRICKS_ADMIN_USER', '$log', 'bricksKernel', 'bricksAuthenticatedRestangularService', '$q',
            function (MODULE_BRICKS_ADMIN_USER, $log, bricksKernel, bricksAuthenticatedRestangularService, $q) {

                $log.debug('AdminUserService');

                function find(id) {
                    $log.debug('AdminUserService.find',id);
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/find.json').get({'id':id}).then(function (result) {
                        $log.debug('AdminUserService.find succeeded',result);
                        deferred.resolve(result.data.user);
                    }, function (error) {
                        $log.error('AdminUserService.find failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function findAll(page,limit,orderBy,filter) {
                    page = page || 1;
                    limit = limit || 25;
                    orderBy = orderBy || 'updated_at:DESC';
                    filter = filter || null;
                    if (filter == '') {
                        filter = null;
                    }
                    $log.debug('AdminUserService.findAll',page,limit,orderBy,filter);
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/all.json').get({'page': page, 'limit': limit, 'orderBy': orderBy, 'filter': filter}).then(function (result) {
                        $log.debug('AdminUserService.findAll succeeded',result);
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminUserService.findAll failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function findByCriteria(page,limit,orderBy,criteria) {
                    page = page || 1;
                    limit = limit || 25;
                    orderBy = orderBy || 'created_at:DESC';
                    criteria = criteria || null;
                    $log.debug('AdminUserService.findByCriteria',page,limit,orderBy,criteria);
                    var deferred = $q.defer();
                    criteria.page = page;
                    criteria.limit = limit;
                    criteria.orderBy = orderBy;
                    bricksAuthenticatedRestangularService.one('admin/user/criteria.json').get(criteria).then(function (result) {
                        $log.debug('AdminUserService.findByCriteria succeeded',result);
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminUserService.findByCriteria failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function findImpersonatable() {
                    $log.debug('AdminUserService.findImpersonatable');
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/impersonatable.json').get().then(function (result) {
                        $log.debug('AdminUserService.findImpersonatable succeeded',result);
                        deferred.resolve(result.data.data.users);
                    }, function (error) {
                        $log.error('AdminUserService.findImpersonatable failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function getPossibleStates() {
                    return ['active','pending','disabled'];
                }

                function getPossibleTypes() {
                    return [
                        'ADMIN',
                        'EDITOR'
                    ];
                }

                function update(user) {
                    $log.debug('AdminUserService.update');
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/update.json').customPOST({ user: user }).then(function (result) {
                        $log.debug('AdminUserService.update: succeeded',result);
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminUserService.update: failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function changePassword(id,password) {
                    $log.debug('AdminUserService.changePassword',id,password);
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/password.json').customPOST({ id: id, password: password }).then(function (result) {
                        $log.debug('AdminUserService.changePassword: succeeded',result);
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminUserService.changePassword: failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function deleteMultiple(users) {
                    $log.debug('AdminUserService.deleteMultiple');
                    var ids = _.pluck(users,'id');
                    $log.debug('AdminUserService.deleteMultiple',ids);
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/delete/multiple.json').customPOST({ ids: ids }).then(function (result) {
                        $log.debug('AdminUserService.deleteMultiple succeeded',result);
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminUserService.deleteByIds failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function triggerForgotPassword(id) {
                    $log.debug('AdminUserService.triggerForgotPassword',id);
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/user/trigger-forgot-pasword.json').get({'id':id}).then(function (result) {
                        $log.debug('AdminUserService.triggerForgotPassword succeeded',result);
                        deferred.resolve(result.data);
                    }, function (error) {
                        $log.error('AdminUserService.triggerForgotPassword failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                return {
                    find: find,
                    findAll: findAll,
                    findByCriteria: findByCriteria,
                    findImpersonatable: findImpersonatable,
                    getPossibleStates: getPossibleStates,
                    update: update,
                    changePassword: changePassword,
                    deleteMultiple: deleteMultiple,
                    triggerForgotPassword: triggerForgotPassword
                }
            }
        ]
    )
;