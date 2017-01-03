'use strict';

angular.module('bricks.wamp',
        [
        ]
    )

    // infrastructure configuration, primarily prefixes to keep DRY
    .constant('MODULE_BRICKS_WAMP', {
        i18nPart: 'bricks/wamp',
        templatePrefix: '/bundles/twentystepsbricksDemo/modules/bricks/wamp/'
    })

    .config(['MODULE_BRICKS_WAMP', '$wampProvider',
        function (MODULE_BRICKS_WAMP, $wampProvider) {
            // configure wamp provider including setting allowed authentication method "WAMP Challenge Response Authentication" (cp. below)
            $wampProvider.init({
                realm: bricks.wamp.realm,
                url: bricks.wamp.client_url,
                authmethods: ["wampcra"]
            });
        }]
    )

    .run(['MODULE_BRICKS_WAMP', '$translate', '$log', '$rootScope', '$wamp', 'NotificationService', 'bricksAuthenticationService',
        function(MODULE_BRICKS_WAMP, $translate, $log, $rootScope, $wamp, NotificationService, bricksAuthenticationService) {

            $log.debug('bricks.wamp: run()');

            // cp. https://github.com/voryx/angular-wamp

            // prepare scope variables
            $rootScope.wamp = {
                subscription: {
                    general: null,
                    personal: null
                }
            };

            // open wamp connection on login of user
            $rootScope.$on('user-logged-in',function(user) {

                $log.debug('bricks.wamp: $on user-logged-in',$rootScope.user);

                $log.debug('bricks.wamp: opening authenticated connection',$rootScope.user.username_for_wamp);
                $wamp.setAuthId($rootScope.user.username.toLowerCase());
                $wamp.open();

            });

            // subscribe some topics on opened wamp connection
            $rootScope.$on("$wamp.open", function (event, session) {
                $log.debug('bricks.wamp: $on $wamp.open',event,session);

                $log.debug('bricks.wamp: subscribing general topic',bricks.custom.wamp.topic.general.uri);
                $rootScope.wamp.subscription.general = $wamp.subscribe(bricks.custom.wamp.topic.general.uri, function(args,customData) {

                    var event = {
                        message: _.first(args),
                        topic: 'general',
                        customData: customData
                    };
                    $log.debug('bricks.wamp: received message from personal topic subscription, will broadcast internally','wamp-message-received',event);
                    $rootScope.$broadcast('wamp-message-received',event);
                });

                var personalTopicUri = bricks.custom.wamp.topic.authenticated_prefix.uri+$rootScope.user.username_for_wamp;
                $log.debug('bricks.wamp: subscribing personal topic',personalTopicUri);
                $rootScope.wamp.subscription.personal = $wamp.subscribe(personalTopicUri, function(args,customData) {

                    var event = {
                        message: _.first(args),
                        topic: 'personal',
                        customData: customData
                    };
                    $log.debug('bricks.wamp: received message from personal topic subscription, will broadcast internally','wamp-message-received',event);
                    $rootScope.$broadcast('wamp-message-received',event);
                });
            });

            // respond to wamp challenge on opening authenticated connection
            $rootScope.$on("$wamp.onchallenge", function (event, data) {
                $log.debug('bricks.wamp: $wamp.onchallenge',event,data);
                if ($rootScope.user) {
                    if (data.method === "wampcra"){
                        // sign challenge using (salted) password (which is a pre-shared secret)
                        var credentials = bricksAuthenticationService.getCredentials();
                        if (!credentials) {
                            $log.error('bricks.wamp: rejecting challenge, no credentials found');
                            return data.promise.reject("credentials-not-found");
                        }
                        var keyToUse = credentials.password;
                        $log.debug('bricks.wamp: will use password',credentials.password);
                        if (typeof data.extra.salt !== 'undefined') {
                            $log.debug('bricks.wamp: will use salt',data.extra.salt);
                            keyToUse = autobahn.auth_cra.derive_key(credentials.password, data.extra.salt);
                        }
                        var signature = autobahn.auth_cra.sign(keyToUse, data.extra.challenge);
                        $log.debug('bricks.wamp: challenge signed',signature);
                        return data.promise.resolve(signature);
                    }
                } else {
                    $log.error('bricks.wamp: rejecting challenge, user not logged in');
                    return data.promise.reject("user-not-logged-in");
                }
            });

            // unsubscribe than close connection on user logged out
            $rootScope.$on('user-logged-out',function(user) {
                $log.debug('bricks.wamp: $on user-logged-out',user);
                if ($rootScope.wamp.subscription.personal) {
                    $log.debug('bricks.wamp: unsubscribing personal topic');
                    $wamp.unsubscribe($rootScope.wamp.subscription.personal);
                    $rootScope.wamp.subscription.personal = null;
                }
                if ($rootScope.wamp.subscription.general) {
                    $log.debug('bricks.wamp: unsubscribing general topic');
                    $wamp.unsubscribe($rootScope.wamp.subscription.general);
                    $rootScope.wamp.subscription.general = null;
                }
                $log.debug('bricks.wamp: closing authenticated connection',user.username);
                $wamp.close();
            });

            $rootScope.$on("$wamp.close", function (event, data) {
                if (data.reason == 'lost') {
                    $log.debug('will try to reconnect');
                }
                $log.debug('bricks.wamp: $on $wamp.close',event,data);
            });

        }]
    )

;
