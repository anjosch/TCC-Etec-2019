app.controller('RedCtrl', function ($scope, $state, $ionicLoading, $rootScope, HistService) {

	$scope.data = {};
	$scope.data.menu = {}; 

	$scope.voltar = function() {
        console.log("voltar")
        $state.go("app.perfil");
    }


		$scope.goPerfil = function () {
			console.log('go perfil ...')
			$state.go('app.perfil');
		}

		$scope.goHome = function () {
			$state.go('app.home');
		}

		$scope.goStatus = function () {
			$state.go('app.status');
		}

		$scope.goNoti = function () {
			$state.go('app.notificacao');
		}

		
    
}

);
