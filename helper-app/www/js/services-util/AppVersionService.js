app.service('AppVersionService', ['$ionicPlatform', '$rootScope', '$cordovaAppVersion',
    function($ionicPlatform, $rootScope, $cordovaAppVersion) {

        $ionicPlatform.ready(function() {
            
            try {
                $cordovaAppVersion.getAppName()
                    .then(function(_appName) {
                        $rootScope.appInfo = {};
                        $rootScope.appInfo.name = _appName;
                        return $cordovaAppVersion.getVersionNumber();
                    })
                    .then(function(_appVersion) {
                        $rootScope.appInfo.version = _appVersion;
                        return $cordovaAppVersion.getVersionCode();
                    })
                    .then(function(_appBuild) {

                        if (ionic.Platform.isAndroid()) {

                            var _major = parseInt(_appBuild / 100000);
                            var _minor = parseInt((_appBuild % 100000) / 1000);
                            var _patch = parseInt(((_appBuild % 100000) % 1000) / 10);

                            _appBuild = _major + '.' + _minor + '.' + _patch;
                        }

                        $rootScope.appInfo.build = _appBuild;
                    });
            } catch (error) {
                $rootScope.appInfo = {};
                $rootScope.appInfo.name = '';
                $rootScope.appInfo.version = '';
                $rootScope.appInfo.build = '';
            }
        });
    }
]);
