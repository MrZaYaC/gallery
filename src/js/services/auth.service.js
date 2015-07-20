(function (angular) {
  'use strict';
  angular.module('app').factory('AuthService', AuthService);

  AuthService.$inject = ['$http', 'appSettings'];
  function AuthService($http, appSettings) {
    var apiUrl = appSettings.API.HOST + 'auth/';
    var service = {
      signUp: signUp,
      signIn: signIn
    };
    return service;

    function signUp(username, password) {
      return $http.post(apiUrl, {
        username: username,
        password: password
      })
    }
    function signIn(username, password){
      return $http.get(apiUrl + '?username='+username+'&password='+password);
    }
  }
})(angular);