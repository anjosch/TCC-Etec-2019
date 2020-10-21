app.controller('CadCtrl', function($scope, $ionicLoading, $rootScope, $ionicPopup, $state) {

    $scope.data = {};
    $scope.data.tipo = "cliente";

    $scope.send = function() {

        console.info("tipo: "+$scope.data.tipo)
        if ($scope.data.tipo == "cliente") {
            $state.go("cliente");
        }
        else {
            $state.go("fornecedor");
        }
    }

    $scope.voltar = function() {
        console.log("voltar")
        $state.go("login");
    }
});
