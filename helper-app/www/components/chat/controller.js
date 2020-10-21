app.controller('ChatCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $rootScope, $interval, StatusService) {

	$scope.data = {};
	$scope.chatEnabled = false;
	$scope.data.servicos = [];
	$scope.data.messages = [];
	$scope.data.usuario = '';
	$scope.data.message = '';
	$scope.data.idOs = 0;
	

    if ($rootScope.user==undefined) 
    {
        $state.go('login');
        return;
    }

	if (angular.isDefined($rootScope.chatTimer)) {
		$interval.cancel($rootScope.chatTimer);
		$rootScope.chatTimer = undefined;
	}

	$scope.goChat = function(serv) {
		console.log('go chat');
		$scope.chatEnabled = true;
		if ($rootScope.userType == 'C') {
			$scope.data.usuario = serv.fornecedor.nome;
		} else {
			$scope.data.usuario = serv.cliente.nome;
		}
		$scope.data.idOs = serv.idOs;
		$scope.data.messages = [];

		
		if (angular.isDefined($rootScope.chatTimer)) {
			$interval.cancel($rootScope.chatTimer);
			$rootScope.chatTimer = undefined;
		}
		$rootScope.chatTimer = $interval(function() {
			console.log('teste interval');
			try {
				$scope.loadServForn2(false);
			} catch(error) {
				if (angular.isDefined($rootScope.chatTimer)) {
					$interval.cancel($rootScope.chatTimer);
					$rootScope.chatTimer = undefined;
				}
			}
		}, 1000);

		for (i=0; i<serv.hist.length; i++) {
			var v =serv.hist[i];
			if (v.status == 'N') {

				if (v.cliente != null) {
					v.tipo = 'C';
				} else {
					v.tipo = 'F';
				}
				$scope.data.messages.push(v);
			}

		}

	}

    $scope.loadServForn2 = function(loading)
	{
			$id = $rootScope.id;
			if (loading) {
				$ionicLoading.show();
			}
			$scope.data.servicos = []; 
			StatusService.getOS($rootScope.userType, $id)
			.then(function (response) {
	
				osSel = null;
				for (i=0; i<response.data.length; i++) {
					var v =response.data[i];
					if (v.garantia == 'S') {
						v.garantiaDesc= 'Sim';
					} else {
						v.garantiaDesc = 'Não';
					}
					if (v.status == 'A') {
						$scope.data.servicos.push(v);
					}

					if ($scope.chatEnabled && v.idOs == $scope.data.idOs) {
						osSel = v;
					}
				}

				if ($scope.data.servicos.length==0) {
					if (loading) 
					{
						$ionicPopup.alert({
							title: 'Atenção',
							content: 'Nenhum registro encontrado!'
						})
						.then(function(result) {
							if ($rootScope.userType == 'C') {
								$state.go('app.home');
							} else {
								$state.go('app.homef');
							}
							$scope.data = {};
						});	
					}
				} else if ($scope.chatEnabled) {
					$scope.goChat(osSel);
				}
	
			})
			.catch(function(error) {
				if (loading) {
					$ionicPopup.alert({
							title: 'Atenção',
							content: 'Erro ao solicitar serviço.'
						})
						.then(function(result) {
							//$state.go('app.home');
							//$scope.data = {};
						});
				}
			})
			.finally(function() {
				$ionicLoading.hide();
			})
		
	}

	$scope.loadServForn2(true);	


	$scope.sendMessage = function() {
		console.log("send message "+$scope.data.message);
		StatusService.sendChatMessage($scope.data.idOs, $scope.data.message,$rootScope.userType, $rootScope.id)
		.then(function (response) {
	
			$scope.data.message = '';
			$scope.loadServForn2(false);	

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
	}

	$scope.disableChat = function() {
		$scope.chatEnabled = false;
		if (angular.isDefined($rootScope.chatTimer)) {
			$interval.cancel($rootScope.chatTimer);
			$rootScope.chatTimer = undefined;
		}
	}
});
