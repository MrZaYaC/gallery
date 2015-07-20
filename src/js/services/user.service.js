(function (angular) {
  'use strict';
  angular.module('app').factory('UserService', UserService);

  UserService.$inject = ['$http', 'appSettings'];
  function UserService($http, appSettings) {
    var apiUrl = appSettings.API.HOST + 'user/';
    var service = {
      profile: profile,
      logout: logout,
      exist: exist
    };
    return service;

    function profile() {
      return $http.get(apiUrl+'profile');
    }
    function logout(){
      return $http.get(apiUrl+'logout');
    }
    function exist(login){
      return $http.get(apiUrl+'exist/?username='+login);
    }
  }
})(angular);