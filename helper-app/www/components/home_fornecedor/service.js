app.factory('HomeFornecedorService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _getServicos = function(_id) {

            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/fornecedor/servicos",
                    skipAuthorization: true,
                    data: {idFornecedor: _id}
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

        var _getRecusas = function(_id) {

            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/fornecedor/recusas",
                    skipAuthorization: true,
                    data: {idFornecedor: _id}
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


        var _addServico = function(_id, _idServico) {

            var deferred = $q.defer();

            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/fornecedor/servico/novo",
                    skipAuthorization: true,
                    data: {idFornecedor: _id, servicos: [{idServico: _idServico}]}
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

        var _delServico = function(_id, _idServico) {

            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/fornecedor/servico/delete",
                    skipAuthorization: true,
                    data: {idFornecedor: _id, servicos: [{idServico: _idServico}]}
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
            getServicos: _getServicos,
            getRecusas: _getRecusas,
            addServico: _addServico,
            delServico: _delServico
        };

    }
]);
