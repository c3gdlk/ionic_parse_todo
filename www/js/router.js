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
      .state('app.sign-in', {
        url: '/sign-in',
        views: {
          'app': {
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInController as signInCtrl'
          }
        }
      })
      .state('app.sign-up', {
        url: '/sign-up',
        views: {
          'app': {
            templateUrl: 'templates/sign-up.html',
            controller: 'SignUpController as signUpCtrl'
          }
        }
      })
      .state('app.habits', {
        url: '/habits',
        views: {
          'app': {
            templateUrl: 'templates/habits.html',
            controller: 'HabitsController as habitsCtrl'
          }
        }
      })
      .state('app.habits-new', {
        url: '/habits/new',
        views: {
          'app': {
            templateUrl: 'templates/new-habit.html',
            controller: 'NewHabitController as newHabitCtrl'
          }
        }
      })
      .state('app.habits-show', {
        url: '/habits/:id',
        views: {
          'app': {
            templateUrl: 'templates/show-habit.html',
            controller: 'HabitController as habitCtrl'
          }
        }
      })
      .state('app.glossary', {
        url: '/glossary',
        views: {
          'app': {
            templateUrl: 'templates/glossary.html',
            controller: 'GlossaryController as glossaryCtrl'
          }
        }
      })
      .state('app.glossary-new', {
        url: '/glossary/new',
        views: {
          'app': {
            templateUrl: 'templates/new-glossary.html',
            controller: 'NewGlossaryController as newGlossaryCtrl'
          }
        }
      })
      .state('app.day-reports', {
        url: '/day-reports',
        views: {
          'app': {
            templateUrl: 'templates/day-reports.html',
            controller: 'DayReportsController as dayReportsCtrl'
          }
        }
      })
      .state('app.day-reports-new', {
        url: '/day-reports/new',
        views: {
          'app': {
            templateUrl: 'templates/new-day-report.html',
            controller: 'NewDayReportController as newDayReportCtrl'
          }
        }
      })
      .state('app.selfies', {
        url: '/selfies',
        views: {
          'app': {
            templateUrl: 'templates/selfies.html',
            controller: 'SelfiesController as selfiesCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tasks');
  }]);
