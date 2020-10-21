app.controller('StatusCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $rootScope, StatusService, HomeFornecedorService) {

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
		if($rootScope.userType=='C') {
			$id = JSON.parse($rootScope.user).idCliente;
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
					if (v.status == 'P' || v.status == 'A') {
						$scope.data.servicos.push(v);
					}
				}

				if ($scope.data.servicos.length==0) {
					$ionicPopup.alert({
						title: 'Atenção',
						content: 'Nenhum registro encontrado!'
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
		} else {

		$ionicLoading.show();
		$scope.data.servicos = []; 

		console.log("get serviços ...");

		HomeFornecedorService.getServicos($rootScope.id)
		.then(function (response) {

			$scope.data.servicosForn = response.data;
			console.log(`get serviços ... ${response.data.length}`);

			$ionicLoading.show();
			HomeFornecedorService.getRecusas($rootScope.id)
			.then(function (response) {

				$scope.data.recusasForn = response.data;
				
				console.log(`get recusas ... ${response.data.length}`);
				$ionicLoading.show();
				StatusService.getAll()
				.then(function (response) {

					console.log(`get os ... ${response.data.length}`);
					for (i=0; i<response.data.length; i++) {
						var v =response.data[i];
						v.visible = false;
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
						if (v.status == 'P') {
							//se for os pendente, verificar se o fornecedor atende o serviço e já não recusou a OS
							for (j=0; j<$scope.data.servicosForn.length; j++) {
								if ($scope.data.servicosForn[j].idServico == v.servico.idServico) {
									
									var foundRecusa = false;
									for (k=0; k<$scope.data.recusasForn.length; k++) {
										if ($scope.data.recusasForn[k].idOs == v.idOs) {
											foundRecusa = true;
											break;
										}
									}
									console.log(`encontrou servico ${v.idOs} recusado? ${foundRecusa}`)
									if (!foundRecusa) {
										$scope.data.servicos.push(v);
									}
									break;
								
								}
							}
							
						} else if (v.status == 'A') {
							//se for os em andamento, verifica se a OS foi aceita por este fornecedor
							console.log(`status A, forn: ${v.fornecedor.idFornecedor} => ${$rootScope.id}`)
							if (v.fornecedor.idFornecedor == $rootScope.id) {
								$scope.data.servicos.push(v);
							}
						}
				
					}

					if ($scope.data.servicos.length==0) {
						$ionicPopup.alert({
							title: 'Atenção',
							content: 'Nenhum registro encontrado!'
						})
						.then(function(result) {
							$state.go('app.homef');
							$scope.data = {};
						});	
					}	

				})
				.catch(function(error) {
					$ionicPopup.alert({
							title: 'Atenção',
							content: 'Erro ao buscar as Ordens de Serviço.'
						})
						.then(function(result) {
						});
				})
				.finally(function() {
					$ionicLoading.hide();
				})
			})
			.catch(function(error) {
				$ionicPopup.alert({
						title: 'Atenção',
						content: 'Erro ao buscar recusas do fornecedor.'
					})
					.then(function(result) {
					});
			})
			.finally(function() {
				$ionicLoading.hide();
			})
		})
		.catch(function (error) {
			$ionicPopup.alert({
				title: 'Atenção',
				content: 'Erro ao buscar serviços do fornecedor.'
			})
			.then(function (result) {
			});
		})
		.finally(function () {
			$ionicLoading.hide();
		})
		}
	}

	$scope.loadServForn();	

	$scope.goPerfil = function () {
		console.log('go perfil ...')
		$state.go('app.perfil');
	}

	$scope.goHome = function () {
		if ($rootScope.userType == 'C') {
            $state.go('app.home');
        } else {
            $state.go('app.homef');
        }
	}

	$scope.goStatus = function () {
		$state.go('app.status');
	}

	$scope.goNoti = function () {
		$state.go('app.notificacao');
	}

	$scope.aceitar = function(serv, os) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Ordem de Serviço',
			template: '<img class="aceita" src="../../img/Design TCC/aceita.png"><br><br>\
			<span class="txt-aceita">Deseja Aceitar a Ordem de Serviço?</span> <br><span class="txt-aceita">Será cobrado uma taxa de R$ '+serv.servico.valor +',00 </span>'
		});
			
		confirmPopup.then(function(res) {
		    if(res) {
				$ionicLoading.show();
				StatusService.updateStatus('A', os, "Ordem Aceita", $rootScope.id).then(function() {
					$scope.loadServForn();
				}).finally(function() {
					$ionicLoading.hide();
				})
		    }
		});
	}
	$scope.recusar = function(serv, os) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Ordem de Serviço',
			template: 'Deseja Recusar a Ordem de Serviço?'
		});
			
		confirmPopup.then(function(res) {
		    if(res) {
				$ionicLoading.show();
				StatusService.recusarOS($rootScope.id, os).then(function() {
					$scope.loadServForn();
				}).finally(function() {
					$ionicLoading.hide();
				})
			}
		});
	}

	$scope.finalizar = function(serv, os) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Ordem de Serviço',
			template: 'Deseja finalizar a Ordem de Serviço?' 
		});
		
		confirmPopup.then(function(res) {
		    if(res) {
				$ionicLoading.show();
				StatusService.updateStatus('F', os, "Ordem Finalizada").then(function() {
					$scope.loadServForn();
				}).finally(function() {
					$ionicLoading.hide();
				})
		    } 
		});
	}

	$scope.cancelar = function(os) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Ordem de Serviço',
			template: 'Deseja cancelar a Ordem de Serviço?' 
		});
			
		confirmPopup.then(function(res) {
		    if(res) {
				$ionicLoading.show();
				StatusService.updateStatus('C', os, "Ordem Cancelada").then(function() {
					$scope.loadServForn();
				}).finally(function() {
					$ionicLoading.hide();
				})
		    } 
		});
	}

	$scope.verDetalhe = function(idOs) {
		console.log(`OS: ${idOs}`);
		for (i=0;i<$scope.data.servicos.length;i++) {
			if ($scope.data.servicos[i].idOs == idOs) {
				$scope.data.servicos[i].visible = !$scope.data.servicos[i].visible;
				break;
			}
		}
	}
});
