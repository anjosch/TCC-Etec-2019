app.controller('HomeCtrl', function ($scope, $state, $ionicLoading, $rootScope,$ionicPopup, HomeService) {

	$scope.home = true;
	$scope.data = {};
	$scope.data.menu = {}; 
	$scope.data.menuFilter = {};
	$scope.data.searchFilter = "";

	if ($rootScope.user==undefined) {
		$state.go('login');
		return;
	}

	console.log("home loading ...")
	$ionicLoading.show();

	HomeService.getMenu()
	.then(function (response) {

		console.info("menu response: "+JSON.stringify(response.data));
		$scope.data.menu = response.data;
		$scope.data.menuFilter = response.data;
		
		
	})
	.catch(function (error) {
		$ionicPopup.alert({
			title: 'Atenção',
			content: 'Erro ao buscar o menu.'
		})
		.then(function (result) {

		});
	})
	.finally(function () {
		$ionicLoading.hide();
	})


	$scope.goServico = function(sel, idServico, icon) {
		console.log("selecionado: "+sel);
		$rootScope.servicoSel = sel;
		$rootScope.servicoIcone = icon;
		$rootScope.idServico = idServico;
		$state.go("app.ordem_servico");
	}

	$scope.filter = function() {
		console.info("searchFilter "+$scope.data.searchFilter);
		$scope.data.menuFilter = $scope.data.menu.filter((_o)=> {
			return _o.nome.toUpperCase().indexOf($scope.data.searchFilter.toUpperCase())>-1;
		})
	}

});