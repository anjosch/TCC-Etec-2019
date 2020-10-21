app.controller('EditaCtrl', function ($scope, $state, $ionicLoading, $rootScope, EditaService) {

    console.log('EditaCtrl');

	$scope.data = {};
    $scope.estados = undefined;
    $scope.cidades = undefined;

    if ($rootScope.user==undefined) {
        $state.go('login');
        return;
    }

    
})
