// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngResource', 'ionic-material','dataServices','ngCordova','bnx.module.facebook', 'directive.g+signin']);
app.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
app.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.navBar.alignTitle('center');

}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    
    .state('app.nof', {
        url: '/nof',
        views: {
            'menuContent':{
                templateUrl: 'templates/nof.html',
                controller: 'NofCtrl'
            }
        }    
    })

    .state('app.nofdetail', {
        url: '/nof-detail',
        views: {
            'menuContent':{
                templateUrl: 'templates/nofdetail.html',
            }
        }    
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent':{
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.register', {
        url: '/register',
        views: {
            'menuContent':{
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.forgot', {
        url: '/forgot',
        views: {
            'menuContent':{
                templateUrl: 'templates/forgot.html',
                controller: 'ForgotCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.information', {
        url: '/information',
        views: {
            'menuContent': {
                templateUrl: 'templates/information.html',
                controller: 'InformationCtrl'
            }
        }
    })
    
    .state('app.epayment', {
        url: '/epayment',
        views: {
            'menuContent':{
                templateUrl: 'templates/epayment.html',
                // controller: 'EpaymentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.cashout', {
        url: '/cashout',
        views: {
            'menuContent':{
                templateUrl: 'templates/cashout.html',
                // controller: 'EpaymentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.cashinatm', {
        url: '/cashinatm',
        views: {
            'menuContent':{
                templateUrl: 'templates/cashinatm.html',
                // controller: 'EpaymentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.tranfer', {
        url: '/tranfer',
        views: {
            'menuContent':{
                templateUrl: 'templates/tranfer.html',
                // controller: 'EpaymentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.pay', {
        url: '/pay',
        views: {
            'menuContent':{
                templateUrl: 'templates/pay.html',
                // controller: 'EpaymentCtrl'
            },
            'fabContent': {
                template: ''
            }
        }    
    })
    
    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
