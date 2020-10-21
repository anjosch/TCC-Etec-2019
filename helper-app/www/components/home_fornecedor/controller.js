app.controller('HomeFornecedorCtrl', function ($scope, $state,$ionicScrollDelegate, $ionicLoading, $rootScope, $ionicPopup, HomeFornecedorService, HomeService) {

	$scope.data = {};
	$scope.data.menu = {};
	$scope.new = false;
	$scope.data.servico = undefined;
	$scope.servicos = undefined;

	if ($rootScope.user==undefined) {
		$state.go('login_fornecedor');
		return;
	}
	
	$scope.loadFornServices = function() {
		$ionicLoading.show();
		HomeFornecedorService.getServicos($rootScope.id)
		.then(function (response) {

			console.info("menu response: "+JSON.stringify(response.data));
			$scope.data.servicos = response.data;
			$ionicScrollDelegate.scrollTop();
		})
		.catch(function (error) {
			$ionicPopup.alert({
				title: 'Atenção',
				content: 'Erro ao buscar serviços.'
			})
			.then(function (result) {

			});
		})
		.finally(function () {
			$ionicLoading.hide();
		})
	}

	$scope.excluirServico = function(_id) {
		$ionicLoading.show();
		HomeFornecedorService.delServico($rootScope.id, _id)
		.then(function (response) {

			$scope.loadFornServices();
		
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
	}

	$scope.newServico = function() {
		$ionicLoading.show();
		HomeService.getMenu()
		.then(function (response) {
			$scope.new = true;
			$scope.servicos = response.data;
		})
		.catch(function (error) {
			$ionicPopup.alert({
				title: 'Atenção',
				content: 'Erro ao buscar serviços.'
			})
			.then(function (result) {

			});
		})
		.finally(function () {
			$ionicLoading.hide();
		})
	}

	$scope.addServico = function() {
		$ionicLoading.show();
		HomeFornecedorService.addServico($rootScope.id, $scope.data.servico.idServico)
		.then(function (response) {

			console.info("response: "+JSON.stringify(response.data));
			$scope.new = false;
			//$scope.data.servicos = response.data;
			$scope.loadFornServices();
		
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
	}

	$scope.addServ = function(serv, id, icon) {
		console.log("add serv: "+JSON.stringify(serv));
		HomeFornecedorService.addServico($rootScope.id, id)
		.then(function (response) {

			console.info("response: "+JSON.stringify(response.data));
			$scope.new = false;
			$scope.loadFornServices();
		
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
	}

	$scope.loadFornServices();
});