app.factory('LoginService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _login = function(user) {

            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/cliente/login",
                    skipAuthorization: true,
                    data: user
                })
                .then(function(response) {
    

                    deferred.resolve(response);
                })
                .catch(function(error) {
                    $log.error(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        return {
            login: _login
        };

    }
]);
