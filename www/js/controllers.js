angular.module('starter.controllers',  ['ionic', 'ngResource','ngSanitize','ionic.utils','chart.js','bnx.module.facebook', 'directive.g+signin'])
app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout) {
  // Form data for the login modal
    $scope.loginData = {};

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
.controller('LoginCtrl', function($scope, $state, $window, $rootScope, $stateParams, $ionicLoading, $q, facebook){
    $rootScope.toggledrag = false; 
    $rootScope.islogin = false;
    $scope.setlogin = function(){
        $rootScope.islogin = true;
    }
    $scope.login = function(){
         console.log($rootScope.islogin);
         $state.go('app.home', {}, { reload: true });
         $window.location.reload(true);
    }

    //google login

        //logout
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            gapi.auth2.getAuthInstance().disconnect();
        });

        //login
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            $scope.resultg = authResult;
            console.log(authResult);
            // var userg;
            // angular.forEach($scope.resultg, function (item) {
            //            userg = item.hg;             
            //    });
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
          console.log('Not signed into Google Plus.');
        });

    //facebook login

        //logout
        $scope.$on('fb.auth.authResponseChange', function (event, response){
            $scope.$apply(function(){
                $scope.connected = (response.status == 'connected'); 
                if($scope.connected){
                    facebook.logout();
                }
            });
        });

        //login
        console.log("facebook");
        $scope.$on('fb.auth.authResponseChange', function (event, response) { 
            $scope.$apply (function () { 
                $scope.connected = (response.status == 'connected'); 
                if ($scope.connected) { 
                    facebook.api('me').then (function (result) { 
                        console.log(result);
                     }); 
                }
            }); 
        }); 
    
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
.controller('ExtensionsCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicLoading, $ionicModal, $ionicPopup, ionicMaterialInk) {

    // Triggered on a button click, or some other target
    $scope.actionSheet = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<b>Share</b> This'
            }, {
                text: 'Move'
            }],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);

    };

    $scope.loading = function() {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Popover
    $scope.popover = function() {
        $scope.$parent.popover.show();
        $timeout(function () {
            $scope.$parent.popover.hide();
        }, 2000);
    };

    // Confirm
    $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'You are now my subscribed to Cat Facts',
            template: 'You will meow receive fun daily facts about CATS!'
        });

        $timeout(function() {
            //ionic.material.ink.displayEffect();
            ionicMaterialInk.displayEffect();
        }, 0);
    };

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
})

.controller('InkCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
})

.controller('ListsCtrl', function ($scope, $stateParams, ionicMaterialMotion) {

    var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };

    $scope.blinds();

})

.controller('MotionCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    var fab = document.getElementById('fab');

    $scope.moveFab = function(dir) {
        fab.style.display = 'none';
        fab.className = fab.className.replace('button-fab-top-left', '');
        fab.className = fab.className.replace('button-fab-top-right', '');
        fab.className = fab.className.replace('button-fab-bottom-left', '');
        fab.className = fab.className.replace('button-fab-bottom-right', '');
        fab.className += ' button-fab-' + dir;
        $timeout(function() {
            fab.style.display = 'block';
        }, 100);
    };

    $scope.motionFab = function(type) {
        var shouldAnimate = false;
        var classes = type instanceof Array ? type : [type];
        for (var i = 0; i < classes.length; i++) {
            fab.classList.toggle(classes[i]);
            shouldAnimate = fab.classList.contains(classes[i]);
            if (shouldAnimate) {
                (function(theClass) {
                    $timeout(function() {
                        fab.classList.toggle(theClass);
                    }, 300);
                })(classes[i]);
            }
        }
    };

    var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds();
        }, 500);
    };

    $scope.blinds();
    //ionic.material.ink.displayEffect(); ionicMaterialMotion
    ionicMaterialInk.displayEffect();
})

.controller('SetupCtrl', function($scope, $stateParams) {
    /* ionic.material.motion.pushDown({
        selector: '.push-down'
    });
    */
})