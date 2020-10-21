app.controller('HistCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $rootScope, HistService, StatusService) {

	console.log("hist controller");

	$scope.data = {};
	$scope.data.userType = $rootScope.userType;
	$scope.data.servicos = [];
	$id = 0;

	if ($rootScope.user==undefined) {
        $state.go('login');
        return;
    }

	if($rootScope.userType=='C') {
		$id = JSON.parse($rootScope.user).idCliente;
	} else {
		$id = JSON.parse($rootScope.user).idFornecedor;
	}

	$ionicLoading.show();
	StatusService.getOS($rootScope.userType, $id)
	.then(function (response) {

		if (response.data.length==0) {
			$ionicPopup.alert({
				title: 'Atenção',
				content: 'Nenhum registro encontrado!'
			})
			.then(function(result) {
				$state.go('app.perfil');
				$scope.data = {};
			});	
		} else {

			for (i=0; i<response.data.length; i++) {
				var v =response.data[i];
				if (v.status == 'F') {
					v.statusDetail = 'Finalizado';
				} else if (v.status == 'C') {
					v.statusDetail = "Cancelado";
				}
				if (v.status == 'F' || v.status == 'C') {
					$scope.data.servicos.push(v);
				}
			}
		}
	})
	.catch(function(error) {
		$ionicPopup.alert({
				title: 'Atenção',
				content: 'Erro ao solicitar serviço.'
			})
			.then(function(result) {
				//$state.go('app.home');
				//$scope.data = {};
			});
	})
	.finally(function() {
		$ionicLoading.hide();
	})
	
	$scope.voltar = function() {
		console.log("voltar")
		$state.go("app.perfil");
	}		
    
}

);
