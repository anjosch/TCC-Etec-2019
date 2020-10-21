app.factory('PerfilService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _do = function(user) {

            var deferred = $q.defer();
 
            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/perfil/",
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

        var _excluirContaCliente = function(_id) {

            var deferred = $q.defer();
 
            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/cliente/status",
                    skipAuthorization: true,
                    data: {idCliente: _id, status: 'E'}
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

        var _excluirContaFornecedor = function(_id) {

            var deferred = $q.defer();
 
            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/fornecedor/status",
                    skipAuthorization: true,
                    data: {idFornecedor: _id, status: 'E'}
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
            do: _do,
            excluirContaCliente: _excluirContaCliente,
            excluirContaFornecedor: _excluirContaFornecedor 
        };
        
    }
]);
