'use strict';

angular.module('bricks.app.notification')

    .service('NotificationService',
        ['MODULE_BRICKS_APP_NOTIFICATION', '$log', '$rootScope', 'webNotification','$interval', '$translate', '$state', '$window',
            function (MODULE_BRICKS_APP_NOTIFICATION, $log, $rootScope, webNotification, $interval, $translate, $state, $window) {

                $log.debug('NotificationService');

                function showNotification(alert,body,icon,sref,autoclose,url) {
                    body = body || "";
                    icon = icon || "/favicon.ico";
                    sref = sref || null;
                    autoclose = autoclose || 100000;
                    url = url || null;
                    $log.debug('NotificationService.showNotification',alert,body,icon,sref,autoclose,url);
                    webNotification.showNotification(alert, {
                        body: body,
                        icon: icon,
                        onClick: function onNotificationClicked() {
                            $log.debug('NotificationService.showNotification: notification clicked');
                            if (sref) {
                                $log.debug('NotificationService.showNotification: going to sref',sref);
                                $state.go(sref);
                            } else if (url) {
                                $log.debug('NotificationService.showNotification: going url',url);
                                $window.open(url,'_blank');
                            }
                        },
                        autoClose: autoclose
                    }, function onShow(error, hide) {
                        $log.debug('NotificationService.showNotification: onShow');
                        if (error) {
                            $log.error('NotificationService.showNotification: onShow with error',error);
                            hide();
                        } else {
                            $log.debug('NotificationService.showNotification: onShow no error')
                        }
                    });
                }

                function showNotificationByKey(key,sref,autoclose) {
                    showNotification(
                        $translate.instant('BRICKS.APP.NOTIFICATION.'+key+'.ALERT'),
                        $translate.instant('BRICKS.APP.NOTIFICATION.'+key+'.BODY'),
                        $translate.instant('BRICKS.APP.NOTIFICATION.'+key+'.ICON'),
                        sref,
                        autoclose
                    );
                }

                // initialization

                function initListeners() {
                    $log.debug('NotificationService.initListeners');

                    // login of user
                    $rootScope.$on('user-logged-in',function() {
                        $log.debug('NotificationService.$on user-logged-in');
                        showNotificationByKey('USER_LOGGED_IN');
                    });

                    // logout of user
                    $rootScope.$on('user-logged-out',function() {
                        $log.debug('NotificationService.$on user-logged-out');
                        showNotificationByKey('USER_LOGGED_OUT');
                    });

                    // message received via WAMP
                    $rootScope.$on('wamp-message-received',function(event,args) {
                        $log.debug('NotificationService.$on wamp-message-received',args);
                        var topic = args.topic;
                        if (topic == 'general' || topic == 'personal' || topic == 'group') {
                            $log.debug('NotificationService.$on wamp-message-received: will show message as Desktop notification');
                            var message = args.message;
                            if (message && _.has(message,'text')) {
                                var text = message.text;
                                var body = null;
                                var sref = null;
                                var icon = null;
                                var autoclose = 100000;
                                var url = null;
                                if (_.has(message,'custom')) {
                                    if (_.has(message.custom, 'translation')) {
                                        body = _.has(message.custom.translation,'body')?$translate.instant(messsage.custom.translation.body):null;
                                        text = _.has(message.custom.translation,'text')?$translate.instant(messsage.custom.translation.text):null;
                                        icon = _.has(message.custom.translation,'icon')?$translate.instant(messsage.custom.translation.icon):null;
                                    }
                                    if (!body) {
                                        body = _.has(message.custom, 'body') ? message.custom.body : body;
                                    }
                                    if (!icon) {
                                        icon = _.has(message.custom, 'icon') ? message.custom.icon : icon;
                                    }
                                    sref = _.has(message.custom, 'sref') ? message.custom.sref : sref;
                                    autoclose = _.has(message.custom, 'autoclose') ? message.custom.autoclose : autclose;
                                    url = _.has(message.custom, 'url') ? message.custom.url : url;
                                }
                                showNotification(text,body,icon,sref,autoclose,url);
                            }
                        } else {
                            $log.debug('NotificationService.$on wamp-message-received: ignoring message');
                        }
                    })
                }

                function init() {
                    $log.debug('NotificationService.init');
                    initListeners();
                }

                // helpers

                init();

                // public interface
                return {
                    showNotification: showNotification
                }
            }
        ])
;