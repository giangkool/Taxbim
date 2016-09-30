angular.module('starter.controllers', ['ionic', 'ngResource', 'ngSanitize', 'dataServices', 'ionic.utils', 'chart.js', 'bnx.module.facebook', 'directive.g+signin'])
app.controller('AppCtrl', function ($scope,$rootScope, $state, $ionicPopup, $ionicModal, $ionicPopover, $timeout, contentService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.first = false;
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
                    //   contentService.Saveregid(e.regid);
                    //   console.log("giang "+ contentService.Saveregid(e.regid));
                        save(e.regid);
                        // prompt("Copy Register Id", e.regid);
                        // sendRequest(e.regid);
                        // alert("Successfully Registered");
                        break;
                    case 'message':
                        // alert(JSON.stringify(e.payload));
                        // prompt("imessege", e.payload.message);
                        // console.log(e);
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
    contentService.Saveregid(gcmid).then(function (response) {
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

    //thông báo đăng nhập
    $scope.Relogin = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Thông báo<br/>',
            template: '<center>Vui lòng đăng nhập để sử dụng dịch vụ !</center>'
        });

        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    // Form data for the login modal
        $scope.changePassData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/changepass.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeChangePass = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.changePass = function () {
            $scope.modal.show();
        };

                // Perform the login action when the user submits the login form
        $scope.doChangePass = function () {
            $scope.first = true;
            console.log('Doing change pass', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeChangePass();
            }, 1000);
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
            window.location.href = '#/app/home';
            window.location.reload(true);
        }
    })
    .controller('RegisterCtrl', function ($scope, $state, $window, $ionicPopup, $rootScope, $stateParams, $location, $anchorScroll ) {
        $scope.logininfo = false;
        $scope.registerinfo = true;
        $scope.complete = true;

         $scope.scroll = function () {
            $anchorScroll();
        };

        //thông báo
         $scope.showError = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo<br/>',
                template: '<center><h5 style="font-size: 16px; color: red;">Mã xác thực không chính xác !<br/>xin vui lòng nhập lại</h5></center>'
            });

            alertPopup.then(function (res) {
                $scope.logininfo = true;
                $scope.registerinfo = false;
            });
        };

        //hoàn tất đăng ký
        $scope.showcomplete = function(){
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo<br/>',
                template: '<center><h5 style="font-size: 16px; color: red;">Thông tin của bạn chưa đúng !<br/>xin vui lòng nhập lại</h5></center>'
            });

            alertPopup.then(function (res) {
                $scope.logininfo = true;
                $scope.registerinfo = true;
                $scope.complete = false;
            });
        };
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
    .controller('SearchCtrl', function ($scope, $state, $window, $rootScope, $stateParams, contentService) {
            $scope.taxlist = [
            { value: 'Danh sách đội thuế chi cục cầu giấy' },
            { value: 'Ngân hàng Ngoại Thương Việt Nam - Vietcombank', id: '970436' },
            { value: 'Ngân hàng Kỹ thương Việt Nam - Techcombank', id: '970407' },
        ];
        $scope.taxname = $scope.taxlist[0];
        $scope.detail = function (){
            window.location.href = '#/app/search-detail';
        };
    })
    .controller('SearchdetailCtrl', function ($scope, $state, $window, $rootScope, $stateParams, contentService) {
        
    })
    .controller('SupportCtrl', function ($scope, $state, $window, $rootScope, $stateParams, $ionicPopup, contentService) {
        //thông báo
     $scope.showError = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo<br/>',
                template: '<center><h5 style="font-size: 16px; color: red;">Mã xác thực không chính xác !<br/>xin vui lòng nhập lại</h5></center>'
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
    })
    .controller('FaqCtrl', function ($scope, $state, $window, $rootScope, $ionicPopup, $stateParams, contentService) {
        $scope.faq = false;
        $scope.showfaq = function(){
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo<br/>',
                template: '<center><h5 style="font-size: 16px; color: green;">Câu hỏi đã được ghi nhận !<br/> Vui lòng chờ phản hồi từ CỤC THUẾ</h5></center>'
            });
             alertPopup.then(function (res) {
               $scope.faq = true;
            });
        };
    })
    .controller('HomeCtrl', function ($scope, $rootScope, $stateParams, $state, ionicMaterialInk) {
        // if (!$rootScope.islogin) {
        //         $state.go('app.login');
        //         console.log($rootScope.islogin);
        //     }
    });


