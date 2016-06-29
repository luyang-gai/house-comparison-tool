var routerApp = angular.module('HousingComparisonTool', ['ui.router']);

  routerApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('main', {
    url: '/home',
    templateUrl: 'app/components/main/main-ctrl.html',
    controller: 'MainCtrl'
  });
});
