angular.module('starter.controllers', ['ionic', 'ngResource', 'ngSanitize', 'dataServices', 'ionic.utils', 'chart.js', 'bnx.module.facebook', 'directive.g+signin'])
app.controller('AppCtrl', function ($scope,$rootScope, $state, $ionicPopup, $ionicModal, $ionicPopover, $timeout, contentService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.logout = function () {
        $state.go('app.login', {}, { reload: true });
        window.location.reload(true);
    };

    contentService.listCatalogs().$promise.then(function (response) {
        $scope.catalogs = response;
        $rootScope.notif = 0;
        pushlength = $scope.catalogs.length;
        // console.log('catalogs:', pushlength);

        for (var i = 0; i < pushlength; i++) {
            $rootScope.has_unread = false;
            // console.log('catalog: ',i,' ',$scope.catalogs[i].read);
            if ($scope.catalogs[i].read == false) {
                $rootScope.has_unread = true;
                break;
            }
        };

        for (var i = 0; i < pushlength; i++) {
            if ($scope.catalogs[i].read == false) {
                $rootScope.notif++;
            }
        };
    });





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

    $scope.int = function abc() {
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
                 console.log("Result " + result);
            }
            function errorHandler(error) {
                console.log("error " + result);
            }
            window.onNotificationGCM = function (e) {
                switch (e.event) {
                    case 'registered':
                    save(e.regid);
                    //   contentService.Saveregid(e.regid);
                    //   console.log("giang "+ contentService.Saveregid(e.regid));

                        // prompt("Copy Register Id", e.regid);
                        // sendRequest(e.regid);
                        // alert("Successfully Registered");
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

    function save(gcmid){
    contentService.Saveregid(gcmid).$promise.then(function (response) {
                          alert("1");
                            console.log(response);
                        });
    }
    //thông báo
    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Thông báo<br/>',
            template: '<center>Chức năng đang được xây dựng !</center>'
        });

        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
})
    .controller('LoginCtrl', function ($scope, $state, $rootScope, $stateParams, $ionicLoading, $q, facebook) {
        $rootScope.toggledrag = false;
        $rootScope.islogin = false;
        $scope.setlogin = function () {
            $rootScope.islogin = true;
        }
        $scope.login = function () {
            console.log($rootScope.islogin);
            // $state.go('app.home', {}, { reload: true });
            window.location.href = '#/app/home';
            window.location.reload(true);
        }
    })
    .controller('RegisterCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        $scope.login = function () {
            $state.go('app.home', {}, { reload: true });
            $window.location.reload(true);
        }
    })
    .controller('ForgotCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        $scope.forgot = function () {
            alert("Yêu cầu đã được gởi đang chờ xử lý !");
            $state.go('app.login', {}, { reload: true });
        }
    })
    .controller('NofCtrl', function ($scope, $state, $window, $rootScope, $stateParams, contentService) {
        // $scope.catalogs = contentService.listCatalogs();
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
        $scope.editpass = function () {
            $scope.enable = true;
        }

    })

