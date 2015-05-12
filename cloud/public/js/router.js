'use strict';

angular.module('starter')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'templates/views.html',
        controller: 'MainController'
      })
      .state('app.tasks', {
        url: '/tasks',
        views: {
          'app': {
            templateUrl: 'templates/tasks.html',
            controller: 'TasksController as tasksCtrl'
          }
        }
      })
      .state('app.tasks-new', {
        url: '/tasks/new',
        views: {
          'app': {
            templateUrl: 'templates/new-task.html',
            controller: 'NewTaskController as newTaskCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tasks');
  }]);
