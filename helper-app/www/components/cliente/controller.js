app.controller('ClienteCtrl', function($scope, $ionicLoading, $rootScope, $ionicPopup, $state, ClienteService, GenericService) {

    $scope.data = {};
    $scope.data.estado = undefined;
    $scope.estados = undefined;
    $scope.cidades = undefined;

    console.log("iniciando controller")

    $ionicLoading.show();

    GenericService.getEstados()
    .then(function(_estados) {
        console.log("buscou estados: "+JSON.stringify(_estados));
        //TODO popular os combos dos estados
        $scope.estados = _estados.data;
    })
    .catch(function(error) {
        $ionicPopup.alert({
                title: 'Atenção',
                content: 'Erro ao buscar os estados.'
            })
            .then(function(result) {
               // $state.go('app.home');
              //  $scope.data = {};
            });
    })
    .finally(function() {
        $ionicLoading.hide();
    })

    $scope.voltar = function() {
        console.log("voltar")
        $state.go("login");
    }

    $scope.getCidades = function() {
        if ($scope.data.estado) {
            //TODO busca das cidades por estado
            GenericService.getCidades($scope.data.estado.idEstado)
            .then(function(_cidades) {
                console.log("buscou cidades: "+JSON.stringify(_cidades));
                //TODO popular os combos dos estados
                $scope.cidades = _cidades.data;
            })
            .catch(function(error) {
                $ionicPopup.alert({
                        title: 'Atenção',
                        content: 'Erro ao buscar as cidades.'
                    })
                    .then(function(result) {
                    //   $state.go('app.home');
                    //   $scope.data = {};
                    });
            })
            .finally(function() {
                $ionicLoading.hide();
            })
        }
    }


    $scope.send = function() {

        //TODO validar campo a campo obrigatorio do form

        if ($scope.data.nome==undefined || $scope.data.nome == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Nome obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.email==undefined || $scope.data.email == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Email obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.pass==undefined || $scope.data.pass == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Senha obrigatória!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.cel==undefined || $scope.data.cel == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Celular obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.cep==undefined || $scope.data.cep == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'CEP obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.estado==undefined || $scope.data.estado == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Estado obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.cidade==undefined || $scope.data.cidade == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Cidade obrigatória!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.endereco==undefined || $scope.data.endereco == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Endereço obrigatório!'
            }).then(function (result) {});

            return;
        }
        
        if ($scope.data.cpf==undefined || $scope.data.cpf == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'CPF obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.resposta==undefined || $scope.data.resposta == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Resposta para possível esquecimento de senha obrigatória!'
            }).then(function (result) {});

            return;
        }

        $ionicLoading.show();

        ClienteService.do($scope.data)
            .then(function(_user) {
                $ionicPopup.alert({
                    title: 'Informação',
                    content: 'Cadastro com sucesso!'
                })
                .then(function(result) {
                    $state.go('app.home');
                    $scope.data = {};
                });
            })
            .catch(function(error) {
                $ionicPopup.alert({
                        title: 'Atenção',
                        content: 'Erro ao realizar o cadastro.'
                    })
                    .then(function(result) {
                        //$state.go('app.home');
                        //$scope.data = {};
                    });
            })
            .finally(function() {
                $ionicLoading.hide();
            })
    };

});
