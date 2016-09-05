angular.module('starter.controllers',  ['ionic', 'ngResource','ngSanitize','ionic.utils','chart.js','bnx.module.facebook', 'directive.g+signin'])
app.controller('AppCtrl', function ($scope, $state, $ionicPopup, $ionicModal, $ionicPopover, $timeout) {
  // Form data for the login modal
    $scope.loginData = {};
    $scope.logout =function(){
        $state.go('app.login', {}, { reload: true });
        window.location.reload(true);
    };

   //background app runing pushnotification
    document.addEventListener('deviceready', function () {
        if (cordova.backgroundapp.resumeType == 'launch') {
            renderUi();
        }
    }, false);
    document.addEventListener("resume", function () {
        if (cordova.backgroundapp.resumeType == 'normal-launch') {
            renderUi();
        } else if (cordova.backgroundapp.resumeType == 'programmatic-launch') {
            cordova.backgroundapp.show();
        }
    }, false);

   $scope.int = function abc(){
       ionic.Platform.ready(function () {

           window.plugins.pushNotification.register(
                successHandler,
                errorHandler,
                {
                    "senderID": "345481149877",
                    "ecb": "onNotificationGCM",
                    "badge": "true",
                    "sound": "true",
                    "alert": "true"
                });
            function successHandler(result) {
                alert("Result " + result);
            }
            function errorHandler(error) {
                alert("error " + result);
            }
            window.onNotificationGCM = function(e) {
                switch (e.event) {
                    case 'registered':
                        prompt("Copy Register Id", e.regid);
                        // alert("ID: " + e.regid);
                        sendRequest(e.regid);
                        alert("Successfully Registered");
                        break;
                    case 'message':
                        // alert(JSON.stringify(e.payload));
                        // prompt("imessege", e.payload.message);
                        console.log(e);
                        alert("imessage: " + e.payload.message);
                        var sound = new Media("assets/www/" + e.soundname);
                        sound.play();
                        break;
                    default:
                        alert("unknown event");
                }
            }

       });
   }

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

