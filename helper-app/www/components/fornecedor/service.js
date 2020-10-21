app.factory('FornecedorService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _do = function(user) {

            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/fornecedor/",
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
        var _forgotPass = function(_cpf, _newPass, _secret) {

            var deferred = $q.defer();
 
            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/fornecedor/forgotpass",
                    skipAuthorization: true,
                    data: {cpf: _cpf, newPass: _newPass, resposta: _secret}
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

        var _changePass = function(_id, _pass, _newPass, _secret) {

            var deferred = $q.defer();
 
            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/fornecedor/changepass",
                    skipAuthorization: true,
                    data: {idFornecedor: _id, pass: _pass, newPass: _newPass, resposta: _secret}
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
            do: _do,
            forgotPass: _forgotPass,
            changePass: _changePass
        };

    }
]);
