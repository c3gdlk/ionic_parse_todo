'use strict';

var module = angular.module('starter');

module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.glossary', {
      url: '/glossary',
      views: {
        'app': {
          templateUrl: 'js/glossary/templates/glossary.html',
          controller: 'GlossaryController as glossaryCtrl'
        }
      }
    })
    .state('app.glossary-new', {
      url: '/glossary/new',
      views: {
        'app': {
          templateUrl: 'js/glossary/templates/new-glossary.html',
          controller: 'NewGlossaryController as newGlossaryCtrl'
        }
      }
    })
}])
