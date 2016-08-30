angular.module('starter.controllers',  ['ionic', 'ngResource','ngSanitize','ionic.utils','chart.js','bnx.module.facebook', 'directive.g+signin'])
app.controller('AppCtrl', function ($scope, $state, $ionicPopup, $ionicModal, $ionicPopover, $timeout) {
  // Form data for the login modal
    $scope.loginData = {};
    $scope.logout =function(){
        $state.go('app.login', {}, { reload: true });
        window.location.reload(true);
    };

    //thông báo
    $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo<br/>',
                template: '<center>Chức năng đang được xây dựng !</center>'
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
    };

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    $scope.groups = [];
    for (var i = 0; i < 1; i++) {
        $scope.groups[i] = {
            name: i,
            items: [],
            show: false
        };
    }
        /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function (group) {
        group.show = !group.show;
    };
    $scope.isGroupShown = function (group) {
        return group.show;
    };
})
.controller('LoginCtrl', function($scope, $state, $rootScope, $stateParams, $ionicLoading, $q, facebook){
    $rootScope.toggledrag = false; 
    $rootScope.islogin = false;
    $scope.setlogin = function(){
        $rootScope.islogin = true;
    }
    $scope.login = function(){
         console.log($rootScope.islogin);
         $state.go('app.home', {}, { reload: true });
         window.location.reload(true);
    }
})
.controller('RegisterCtrl', function($scope, $state, $window, $rootScope, $stateParams){
    $scope.login = function(){
         $state.go('app.home', {}, { reload: true });
         $window.location.reload(true);
    }
})
.controller('ForgotCtrl', function($scope, $state, $window, $rootScope, $stateParams){
    $scope.forgot = function(){
         alert("Yêu cầu đã được gởi đang chờ xử lý !");
         $state.go('app.login', {}, { reload: true });
    }
})
.controller('HomeCtrl', function ($scope, $rootScope, $stateParams, $state, ionicMaterialInk) {
    // if (!$rootScope.islogin) {
    //         $state.go('app.login');
    //         console.log($rootScope.islogin);
    //     }
})
.controller('InformationCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.enable = false;
    $scope.editpass = function()
    {
        $scope.enable = true;
    }
    
})

