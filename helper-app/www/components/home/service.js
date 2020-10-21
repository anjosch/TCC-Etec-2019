app.factory('HomeService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _getMenu = function(user) {

            var deferred = $q.defer();

            $http({
                    method: 'GET',
                    url: configuration.ENDPOINT_URL + "/servico/",
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
            getMenu: _getMenu
        };

    }
]);
