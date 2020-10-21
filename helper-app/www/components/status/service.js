app.factory('StatusService', ['$q', '$http', '$log', 'configuration',
    function($q, $http, $log, configuration) {

        var _getOS = function(userType, _id) {

            var deferred = $q.defer();
 
            $http({
                    method: 'GET',
                    url: configuration.ENDPOINT_URL + (userType=='C'? "/ordem_serv/cliente/"+_id:"/ordem_serv/fornecedor/"+_id),
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

        var _getAll = function() {

            var deferred = $q.defer();
 
            $http({
                    method: 'GET',
                    url: configuration.ENDPOINT_URL + "/ordem_serv/",
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

        var _updateStatus = function(_status, _idOs, _mensagem, _idFornecedor) {

            var deferred = $q.defer();
 
            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/ordem_serv/status",
                    skipAuthorization: true,
                    data: {idOs: _idOs, mensagem: _mensagem, status: _status, fornecedor: {idFornecedor: _idFornecedor}}, 
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

        var _sendChatMessage = function(_idOs, _mensagem, userType, _id) {

            var deferred = $q.defer();
 
            var _dataIn = null;
            if (userType == 'C') {
                _dataIn = {idOs: _idOs, mensagem: _mensagem, status: 'N', cliente: {idCliente: _id}};
            } else {
                _dataIn = {idOs: _idOs, mensagem: _mensagem, status: 'N', fornecedor: {idFornecedor: _id}};
            }

            $http({
                    method: 'PUT',
                    url: configuration.ENDPOINT_URL + "/ordem_serv/status",
                    skipAuthorization: true,
                    data: _dataIn, 
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

        var _recusarOS = function(_idFornecedor, _idOS) {

            var deferred = $q.defer();
 
            $http({
                    method: 'POST',
                    url: configuration.ENDPOINT_URL + "/fornecedor/rejectOS",
                    skipAuthorization: true,
                    data: {idFornecedor: _idFornecedor, idOS: _idOS}
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
            getOS: _getOS,
            getAll: _getAll,
            updateStatus: _updateStatus,
            recusarOS: _recusarOS,
            sendChatMessage: _sendChatMessage
        };
        
    }
]);
