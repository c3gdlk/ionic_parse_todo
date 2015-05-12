'use strict';

var module = angular.module('starter');

module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.habits', {
      url: '/habits',
      views: {
        'app': {
          templateUrl: 'js/habits/templates/habits.html',
          controller: 'HabitsController as habitsCtrl'
        }
      }
    })
    .state('app.habits-new', {
      url: '/habits/new',
      views: {
        'app': {
          templateUrl: 'js/habits/templates/new-habit.html',
          controller: 'NewHabitController as newHabitCtrl'
        }
      }
    })
    .state('app.habits-show', {
      url: '/habits/:id',
      views: {
        'app': {
          templateUrl: 'js/habits/templates/show-habit.html',
          controller: 'HabitController as habitCtrl'
        }
      }
    })
}])
