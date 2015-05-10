'use strict';

var module = angular.module('starter');

module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.sign-in', {
      url: '/sign-in',
      views: {
        'app': {
          templateUrl: 'js/authentication/templates/sign-in.html',
          controller: 'SignInController as signInCtrl'
        }
      }
    })
    .state('app.sign-up', {
      url: '/sign-up',
      views: {
        'app': {
          templateUrl: 'js/authentication/templates/sign-up.html',
          controller: 'SignUpController as signUpCtrl'
        }
      }
    })
}])
