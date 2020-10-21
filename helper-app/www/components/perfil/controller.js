app.controller('PerfilCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $rootScope, PerfilService) {

    $scope.data = {};
    if ($rootScope.user==undefined) 
    {
        $state.go('login');
        return;
    }

    $scope.data.usuario = JSON.parse($rootScope.user).nome;
	$scope.data.menu = {}; 

    $scope.excluirConta = function() {

        var confirmPopup = $ionicPopup.confirm({
			title: '<div  class="title-pup">Perfil - Excluir Conta</div>',
			template: 'Deseja excluir sua conta?'
		});
			
		confirmPopup.then(function(res) {
		    if(res) {
                $ionicLoading.show();
				if ($rootScope.userType == 'C') {
                    PerfilService.excluirContaCliente(JSON.parse($rootScope.user).idCliente).then(function(){
                        $ionicLoading.hide();
                        $rootScope.user = null;
                        $state.go('login');
                    }).finally(function() {
                        $ionicLoading.hide();
                    });
                } else {
                    PerfilService.excluirContaFornecedor(JSON.parse($rootScope.user).idFornecedor).then(function(){
                        $ionicLoading.hide();
                        $rootScope.user = null;
                        $state.go('login');
                    }).finally(function() {
                        $ionicLoading.hide();
                    });
                }
                
		    }
		});

        
    }

    $scope.logoff = function () {
        console.log('go login ...')
        $rootScope.user = null;
        if ($rootScope.userType == 'C') {
            $state.go('login');
        } else {
            $state.go('login_fornecedor');
        }
    }

    $scope.goHist = function () {
        $state.go('app.hist');
    }

    $scope.goEdita = function() {
        $state.go("app.edita");
    }

    $scope.goComo = function () {
        $state.go('app.como');
    }

    $scope.goRed = function () {
        $state.go('app.red');
    }


}



);
