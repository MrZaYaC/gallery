(function(angular){
  'use strict';
  angular.module('app').directive('ngGallery', ngGallery);
  ngGallery.$inject = ['ngGalleryService'];
  function ngGallery(ngGalleryService) {
    return {
      restrict: 'EA',
      templateUrl: '/view/directive/ng-gallery.html',
      scope: {
        searchHandle: '='
      },
      link: function (scope, element, attr) {
        ngGalleryService.getPhotos().then(function(res) {
          scope.images = res.data;
        })
      }
    };
  }
})(angular);