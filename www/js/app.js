
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ui.router'])

.constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')
.constant("FBURLROOT", " your firebase root url")
.constant("FBURL", "your firebase root url/portfolio/")
.service('rootRef', ['FirebaseUrl', Firebase])

.run(ApplicationRun)

.config(ApplicationConfig);


function ApplicationRun($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
}
ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth) {
  return Auth.$requireAuth();
}
AuthDataResolver.$inject = ['Auth'];

function ApplicationConfig($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
  })
  .state('portfolio', {
    url: '/portfolio',
    templateUrl: 'templates/portfolio.html',
    controller: 'PortfolioController'
  })
 

  .state('edit/:id', {
    url: '/edit/:id',
    templateUrl: 'templates/edit.html',
    controller: 'EditController as ctrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html',
    resolve: {
      authData: AuthDataResolver
    }
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.add', {
        url: '/add',
        views: {
          'tab-chats': {
            templateUrl: 'templates/add.html',
            controller: 'AddController'
          }
        }
      })
 
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}
ApplicationConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
