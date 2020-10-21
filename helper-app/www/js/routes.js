app.config(function($stateProvider, $urlRouterProvider) {

    console.log ('stateProvider');

    $stateProvider

    .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'components/login/template.html',
        controller: 'LoginCtrl'
    })

    .state('login_fornecedor', {
        cache: false,
        url: '/login_fornecedor',          
        templateUrl: 'components/login_fornecedor/template.html',
        controller: 'LoginFornecedorCtrl'
   })

   .state('fornecedor', {
        cache: false,
        url: '/fornecedor',
        templateUrl: 'components/fornecedor/template.html',
        controller: 'FornecedorCtrl'
    })

    .state('cad', {
        cache: false,
        url: '/cad',
        templateUrl: 'components/cad/template.html',
        controller: 'CadCtrl'
    })

    .state('cliente', {
        cache: false,
        url: '/cliente',
        templateUrl: 'components/cliente/template.html',
        controller: 'ClienteCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'components/menu/template.html',
        controller: 'MenuCtrl'
    })

    .state('app.home', {
        cache: false,
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'components/home/template.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.homef', {
        cache: false,
        url: '/homef',
        views: {
            'menuContent': {
                templateUrl: 'components/home_fornecedor/template.html',
                controller: 'HomeFornecedorCtrl'
            }
        }
    })

    .state('app.ordem_servico', {
        cache: false,
        url: '/ordem_servico',
        views: {
            'menuContent': {
                templateUrl: 'components/ordem_servico/template.html',
                controller: 'OrdemServicoCtrl'
            }
        }
    })

    .state('app.perfil', {
        cache: false,
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'components/perfil/template.html',
                controller: 'PerfilCtrl'
            }
        }
    })

    .state('app.status', {
        cache: false,
        url: '/status',
        views: {
            'menuContent': {
                templateUrl: 'components/status/template.html',
                controller: 'StatusCtrl'
            }
        }
    })

    .state('app.notificacao', {
        cache: false,
        url: '/notificacao',
        views: {
            'menuContent': {
                templateUrl: 'components/notificacao/template.html',
                controller: 'NotificacaoCtrl'
            }
        }
    })

    .state('app.hist', {
        cache: false,
        url: '/hist',
        views: {
            'menuContent': {
                templateUrl: 'components/hist/template.html',
                controller: 'HistCtrl'
            }
        }
    })

    .state('app.edita', {
        cache: false,
        url: '/edita',
        views: {
            'menuContent': {
                templateUrl: 'components/edita/template.html',
                controller: 'EditaCtrl'
            }
        }
    })

    .state('app.como', {
        cache: false,
        url: '/como',
        views: {
            'menuContent': {
                templateUrl: 'components/como_funciona/template.html',
                controller: 'ComoCtrl'
            }
        }
    })

    .state('app.red', {
        cache: false,
        url: '/red',
        views: {
            'menuContent': {
                templateUrl: 'components/red/template.html',
                controller: 'RedCtrl'
            }
        }
    })

    .state('app.chat', {
        cache: false,
        url: '/chat',
        views: {
            'menuContent': {
                templateUrl: 'components/chat/template.html',
                controller: 'ChatCtrl'
            }
        }
    })



    $urlRouterProvider.otherwise('/login');
});
