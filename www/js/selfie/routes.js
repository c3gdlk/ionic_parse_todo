'use strict';

var module = angular.module('starter');

module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.selfies', {
      url: '/selfies',
      views: {
        'app': {
          templateUrl: 'js/selfie/templates/selfies.html',
          controller: 'SelfiesController as selfiesCtrl'
        }
      }
    })
}])
