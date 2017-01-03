'use strict';

angular.module('bricks.admin.dashboard')

    .service('AdminDashboardService',
        ['MODULE_BRICKS_ADMIN_DASHBOARD', '$log', 'bricksKernel', 'bricksAuthenticatedRestangularService', '$q', '$translate',
            function (MODULE_BRICKS_ADMIN_DASHBOARD, $log, bricksKernel, bricksAuthenticatedRestangularService, $q, $translate) {

                $log.debug('AdminDashboardService');

                function dashboard() {
                    $log.debug('AdminDashboardService.dashboard');
                    var deferred = $q.defer();
                    bricksAuthenticatedRestangularService.one('admin/dashboard.json').get().then(function (result) {
                        $log.debug('AdminDashboardService.dashboard succeeded',result);
                        var dashboard = result.data.data;
                        dashboard.chart = {
                            usersType: createUsersTypeChart(dashboard),
                            usersLogin: createUsersLoginChart(dashboard)
                        };
                        deferred.resolve(result.data.data);
                    }, function (error) {
                        $log.error('AdminDashboardService.dashboard failed', error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

                function createUsersTypeChart(dashboard) {
                    var chartData = {
                        labels: [],
                        data: []
                    };
                    for (var type in dashboard.statistics.users.types) {
                        chartData.labels.push($translate.instant('BRICKS.USER.TYPE.'+type.toUpperCase()));
                        chartData.data.push(dashboard.statistics.users.types[type]);
                    }
                    $log.debug('AdminDashboardService.usersTypeChart',chartData);
                    return chartData;
                }

                function createUsersLoginChart(dashboard) {
                    var chartData = {
                        labels: [],
                        series: [$translate.instant('DASHBOARD.ADMIN.DASHBOARD.CHART.USERS.LOGIN.TITLE')],
                        data: [],
                        options: {
                            barShowStroke : false
                        }
                    };
                    var row = [];
                    for (var login in dashboard.statistics.users.logins) {
                        chartData.labels.push(moment(login*1000).format('l'));
                        row.push(dashboard.statistics.users.logins[login]);
                    }
                    chartData.data.push(row);
                    $log.debug('AdminDashboardService.usersLoginChart',chartData);
                    return chartData;
                }

                return {
                    dashboard: dashboard
                }
            }
        ])
;