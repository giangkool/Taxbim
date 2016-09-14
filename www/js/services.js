angular.module('dataServices', [])
.factory('contentService', function($resource, $http) {
  var catalogs = [];
  return{
    listCatalogs: function () {
                catalogs = $resource('http://icare.bigpay.vn/gcm/catalog/gcm').query();
                return catalogs;
            },
    Saveregid: function (regid){
                //var parameter = JSON.stringify({regid});
                var url = 'http://icare.bigpay.vn/gcm/' + regid ;
                return $http.post(url);
    }
  }
});

