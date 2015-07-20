(function(angular){
    'use strict';
    angular.module('app').config(appRoute);
    appRoute.$inject = ['$stateProvider'];

    function appRoute($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/view/home.html',
            //controller: 'HomeController',
            //controllerAs: 'vm',
            data: {
                title: 'MAIN.BRAND'
            }
        });
        $stateProvider.state('404', {
            url: '/404',
            templateUrl: '/view/404.html',
            //controller: '404Controller',
            //controllerAs: 'vm',
            data: {
                title: 'MAIN.BRAND'
            }
        });
    }
})(angular);