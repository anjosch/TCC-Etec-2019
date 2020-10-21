app.controller('OrdemServicoCtrl', function($scope, $ionicLoading, $rootScope, $ionicPopup, $state, OrdemServicoService) {

    console.info("ordem servico loading");

    if ($rootScope.user==undefined) {
        $state.go('login');
        return;
    }
    var myPopup;
    $scope.sent = false;
    $scope.osNumber = undefined;
    $scope.data = {};
    $scope.data.garantia ="S";
    $scope.data.descricao = "teste"; 
    $scope.data.marca = "marca";
    $scope.data.tipo = "tipo"; 
    $scope.data.prazo = "1"; 
    $scope.data.cliente = {};
    $scope.data.cliente.idCliente = $rootScope.id;
    $scope.data.servico = {};
    $scope.data.servico.idServico = $rootScope.idServico;
    $scope.data.status = 'P';
    $scope.categoria = $rootScope.servicoSel;
    $scope.icone = $rootScope.servicoIcone;

    //console.log("iniciando controller "+$rootScope.servicoSel);

    $scope.finish = function() {
        myPopup.close();
        $state.go("app.status");
    }

    $scope.send = function() {

        
        //TODO validar campo a campo obrigatorio do form

        if ($scope.data.descricao==undefined || $scope.data.descricao== null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Descrição do defeito é obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.marca==undefined || $scope.data.marca == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Marca do produto é obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.tipo==undefined || $scope.data.tipo == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Modelo do produto é obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.prazo==undefined || $scope.data.prazo == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'O prazo desejado para execução é obrigatório!'
            }).then(function (result) {});

            return;
        }

        if ($scope.data.garantia==undefined || $scope.data.garantia == null ) {
            $ionicPopup.alert({
                title: 'Atenção',
                content: 'Informar se seu produto possui ou não garantia é obrigatório!'
            }).then(function (result) {});

            return;
        }

        $ionicLoading.show();

        OrdemServicoService.do($scope.data)
            .then(function(result) {

                $scope.osNumber = result.data.idOs;
                myPopup = $ionicPopup.show({
                    template: '\
                    <div id="insercao">\
                        <a ng-click="finish()"><i class="ion-ios-close icon-status icon-os"></i></a>\
                        <img class="ins" src="../../img/Design TCC/solicitar manutencao/insercao.png">\
                        <br><br>\
                        <p>Solicitação enviada!</p><br>\
                        <span class="txt-insercao">Sua solicitação foi enviada, aguarde a <br> resposta de um dos fornecedores.<br> Seu código é:</span>\
                        <div class="line"></div>\
                        <h1 class="os-number">{{osNumber}}</h1>\
                    </div>\
                    ',
                    title: '',
                    subTitle: '',
                    scope: $scope,
                    buttons: [
                      
                    ]
                  });
                  

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
    };

});