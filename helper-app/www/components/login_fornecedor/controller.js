
app.controller('LoginFornecedorCtrl', function ($scope, $ionicLoading, $rootScope, $ionicPopup, $state, LoginFornecedorService) {

    $scope.data = {};
    $scope.data.email = "emily_kaori@hotmail.com";
    $scope.data.senha = "1234";
    $scope.data.tipo = "cliente";

    console.log('login starting ...');
    $rootScope.user = null;

    $scope.goCad = function () {
        $state.go('cad');
    }

    $scope.goLogin = function () {
        $state.go('login');
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

        LoginFornecedorService.login($scope.data)
            .then(function (response) {

                if (response.data == "") 
                {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        content: 'Usuário ou senha inválidos!'
                    }).then(function (result) {});
                } else {

                    $rootScope.id = response.data.idFornecedor;
                    $rootScope.userType = 'F';
                    $rootScope.user = JSON.stringify(response.data);
                    $state.go('app.homef');
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
