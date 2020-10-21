var app = angular.module('helper', ['ionic', 'ngCordova', 'ngCurrencyMask'])

    .run(function ($ionicPlatform, $rootScope, $interval) {


        $rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            console.log("routeChangeStart: " + event);
            if (angular.isDefined($rootScope.chatTimer)) {
                $interval.cancel($rootScope.chatTimer);
                $rootScope.chatTimer = undefined;
            }
          });
          

        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

           
        })



    })

    .constant('configuration', {
        ENDPOINT_URL: 'http://localhost:3130'
    });
