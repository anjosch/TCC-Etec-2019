app.controller('MenuCtrl', function ($scope, $rootScope, $state, $ionicPlatform) {

	$scope.logoff = function () {

		$rootScope.user = null;
		$state.go('login');
	};

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

	$scope.goChat = function () {
		$state.go('app.chat');
	}

});