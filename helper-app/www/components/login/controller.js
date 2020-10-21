
app.controller('LoginCtrl', function ($scope, $ionicLoading, $rootScope, $ionicPopup, $state, LoginService) {

    $scope.data = {};
    $scope.data.email = "gabri.anjos@yahoo.com.br";
    $scope.data.senha = "123456";
    $scope.data.tipo = "cliente";

    console.log('login starting ...');
    $rootScope.user = null;

    $scope.goCad = function () {
        $state.go('cad');
    }

    $scope.goLoginFornecedor = function () {
        $state.go('login_fornecedor');
    }

    $scope.login = function () {

        if ($scope.data.email==undefined || $scope.data.email=="") {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Email obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.senha==undefined || $scope.data.senha == "" ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Senha obrigatória!'
            }).then(function (result) {});

            return;
        } 

        $ionicLoading.show();

        LoginService.login($scope.data)
            .then(function (response) {

                if (response.data == "") 
                {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        content: 'Usuário ou senha inválidos!'
                    }).then(function (result) {});
                } else {

                    $rootScope.id = response.data.idCliente;
                    $rootScope.userType = 'C';
                    $rootScope.user = JSON.stringify(response.data);
                    $state.go('app.home');
                }
            })
            .catch(function (error) {
                $ionicPopup.alert({
                    title: 'Atenção',
                    content: 'Usuário ou senha inválidos.'
                })
                .then(function (result) {

                });
            })
            .finally(function () {
                $ionicLoading.hide();
            })
    };

});
