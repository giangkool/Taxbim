angular.module('dataServices', [])
.factory('contentService', function($resource) {
  var catalogs = [];
  return{
    listCatalogs: function () {
                catalogs = $resource('http://icare.bigpay.vn/gcm/catalog/gcm').query();
                return catalogs;
            },
    Saveregid: function (regid){
      var url = 'http://icare.bigpay.vn/gcm/';
      var parameter = regid;
      return $http.post(url, parameter);
    }
  }
});

