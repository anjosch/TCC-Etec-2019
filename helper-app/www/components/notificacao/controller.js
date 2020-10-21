app.controller('NotificacaoCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $rootScope, StatusService) {

	$scope.data = {};
	$scope.data.userType = $rootScope.userType;
	$scope.data.servicos = []; 
	$scope.data.servicosForn = [];
	$id = 0;

	if ($rootScope.user==undefined) {
		$state.go('login');
		return;
	}

	$scope.loadServForn = function()
	{
			$id = $rootScope.id;
			$ionicLoading.show();
			$scope.data.servicos = []; 
			StatusService.getOS($rootScope.userType, $id)
			.then(function (response) {
	
				for (i=0; i<response.data.length; i++) {
					var v =response.data[i];
					if (v.status == 'P') {
						v.statusDetail = 'Aguardando Fornecedor';
					} else if (v.status == 'A') {
						v.statusDetail = "Em Andamento";
					} 
					if (v.garantia == 'S') {
						v.garantiaDesc= 'Sim';
					} else {
						v.garantiaDesc = 'Não';
					}
					var found = false;
					if ($rootScope.userType == 'C') {
						notifLS =localStorage.getItem('cliente_'+$rootScope.id+'_notif');
						if (notifLS!=undefined) {
							notifs = JSON.parse(notifLS);
							found = false;
							for (j=0; j<notifs.length; j++) {
								if (notifs[j]==v.idOs) {
									found = true;
								}
							}
						}
						if (!found &&  v.status == 'A') {
							v.statusFinal = 'Seu serviço foi aceito.';
							$scope.data.servicos.push(v);
						}
					} else {
						notifLS =localStorage.getItem('forn_'+$rootScope.id+'_notif');
						if (notifLS!=undefined) {
							notifs = JSON.parse(notifLS);
							found = false;
							for (j=0; j<notifs.length; j++) {
								if (notifs[j]==v.idOs) {
									found = true;
								}
							}
						}
						if (!found &&  v.status == 'C') {
							v.statusFinal = 'O serviço foi cancelado.';
							$scope.data.servicos.push(v);
						} else if (!found &&  v.status == 'F') {
							v.statusFinal = 'O serviço foi finalizado.';
							$scope.data.servicos.push(v);
						}
					}
				}

				if ($scope.data.servicos.length==0) {
					$ionicPopup.alert({
						title: 'Atenção',
						content: 'Nenhuma nova notificação!'
					})
					.then(function(result) {
						$state.go('app.home');
						$scope.data = {};
					});	
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
	}

	$scope.loadServForn();	

}

);
