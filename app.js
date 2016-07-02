var routerApp = angular.module('HousingComparisonTool', ['ui.router', 'ui.bootstrap']);

  routerApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('main', {
      url: '/home',
      templateUrl: 'app/components/main/main-ctrl.html',
      controller: 'MainCtrl'
    })
    .state('housingForm', {
      url: '/housingForm',
      templateUrl: 'app/components/house-form/house-form-ctrl.html',
      controller: 'HouseFormCtrl'
    });
});
