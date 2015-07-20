(function(angular){
  'use strict';
  angular.module('app').service('ngGalleryService', ngGalleryService);
  ngGalleryService.$inject = ['$http'];
  function ngGalleryService($http) {
    var service = {
      getPhotos: getPhotos
    };
    return service;

    function getPhotos() {
      return $http.get('images.json');
    }
  }
})(angular);