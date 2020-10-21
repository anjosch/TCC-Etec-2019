app.factory('NotificacaoService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _do = function(user) {

            var deferred = $q.defer();
 
            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/status/",
                    skipAuthorization: true,
                    data: user
                })
                .then(function(response) {
    
                    deferred.resolve('success');
                })
                .catch(function(error) {
                    $log.error(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };
        return {
            do: _do
        };
        
    }
]);
