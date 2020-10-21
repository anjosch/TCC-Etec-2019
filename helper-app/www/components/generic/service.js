app.factory('GenericService', function ($q, $http, $log, $filter, $rootScope, configuration) {

    var _getEstados = function(user) {

        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: configuration.ENDPOINT_URL + "/estado/",
                skipAuthorization: true
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

    var _getCidades = function(estado) {

        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: configuration.ENDPOINT_URL + "/cidade/"+estado,
                skipAuthorization: true
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
        getEstados: _getEstados,
        getCidades: _getCidades,
    };

});
