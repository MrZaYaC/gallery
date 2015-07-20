(function (angular) {
  'use strict';
  angular.module('app', [
    'ngCookies',
    'ui.router',
    'ngSanitize',
    'pascalprecht.translate',
    'ui.bootstrap',
    'app.config'
  ])
    .config(configure)
    .run(runBlock);

  configure.$inject = ['$urlRouterProvider', '$locationProvider', '$translateProvider'];

  function configure($urlRouterProvider, $locationProvider, $translateProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $urlRouterProvider.otherwise('/404');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/translation-',
      suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escaped');
  }

  runBlock.$inject = ['$rootScope', '$state', '$filter'];

  function runBlock($rootScope, $state, $filter){
    $rootScope.pageTitle = $filter('translate')('MAIN.BRAND');
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      //Set page title
      var state = $state.current;
      $rootScope.pageTitle = $filter('translate')(state.data && state.data.title || state.title);
    });
  }
})(angular);
