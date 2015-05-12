'use strict';

var module = angular.module('starter');

module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.day-reports', {
      url: '/day-reports',
      views: {
        'app': {
          templateUrl: 'js/day-reports/templates/day-reports.html',
          controller: 'DayReportsController as dayReportsCtrl'
        }
      }
    })
    .state('app.day-reports-new', {
      url: '/day-reports/new',
      views: {
        'app': {
          templateUrl: 'js/day-reports/templates/new-day-report.html',
          controller: 'NewDayReportController as newDayReportCtrl'
        }
      }
    })
}])
