'use strict';

var module = angular.module('starter.controllers');

module.controller('DayReportsController', ['$scope', '$state', 'userAccess', 'blockAppUntilReport', function($scope, $state, userAccess, blockAppUntilReport) {
  this.reports = [];

  var self = this;

  userAccess.checkAndRedirect();

  var _loadReports = function() {
    var DayReport = Parse.Object.extend('DayReport');
    var query = new Parse.Query(DayReport);
    query.equalTo("user", Parse.User.current());
    query.limit(500);
    query.find().then(function(reports) {
      for (var i in reports) {
        reports[i].edit = false;
        reports[i].whatDoneAndLearn  = reports[i].get('whatDoneAndLearn');
        reports[i].whatBecomesBetter = reports[i].get('whatBecomesBetter');
        reports[i].isPlanDone        = reports[i].get('isPlanDone');
        reports[i].whatWasBad        = reports[i].get('whatWasBad');
      }

      $scope.$apply(function() {
        self.reports = reports;
      })
    })
  }

  this.canCreateNewReport = function() {
    return blockAppUntilReport.lastReportDateWasLongTimeAgo(blockAppUntilReport.storedLastReportDate);
  }

  this.startEdit = function(report) {
    report.edit = true;
  }

  this.cancelEdit = function(report) {
    report.edit = false;
  }

  this.update = function(report) {
    report.set('whatDoneAndLearn',  report.whatDoneAndLearn);
    report.set('whatBecomesBetter', report.whatBecomesBetter);
    report.set('isPlanDone',        report.isPlanDone);
    report.set('whatWasBad',        report.whatWasBad);

    report.save().then(function() {
      $scope.$apply(function() {
        self.cancelEdit(report);
      })
    })
  }

  $scope.$on('$ionicView.enter', function () {
    _loadReports();
  });
}]);
