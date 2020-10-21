app.controller('ComoCtrl', function($scope, $ionicLoading, $rootScope, $ionicPopup, $state) {

    $scope.data = {};
	
	$scope.voltar = function() {
        console.log("voltar")
        $state.go("app.perfil");
    }
		
    
}

);
