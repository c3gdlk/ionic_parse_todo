'use strict';

var module = angular.module('starter.controllers');

module.controller('NewDayReportController', ['$scope', '$state', 'userAccess', 'blockAppUntilReport', function($scope, $state, userAccess, blockAppUntilReport) {
  userAccess.checkAndRedirect();

  this.newReport = {whatDoneAndLearn: null, whatBecomesBetter: null, isPlanDone: null, whatWasBad: null};

  var self = this;

  var _createReport = function() {
    self.newReport.reportedAt = blockAppUntilReport.newReportDate();

    Parse.Cloud.run("createDayReport", {report: self.newReport}).then(function(report) {
      self.newReport = {whatDoneAndLearn: null, whatBecomesBetter: null, isPlanDone: null, whatWasBad: null};
      $state.go('app.day-reports');
    })
  }

  this.createReport = function() {
    if (!(this.newReport.whatDoneAndLearn && this.newReport.whatBecomesBetter && this.newReport.isPlanDone && this.newReport.whatWasBad)) {
      return false;
    }

    blockAppUntilReport.fetchLastDayReport(function(dayReport) {
    if (dayReport) {
      if (blockAppUntilReport.lastReportDateWasLongTimeAgo(dayReport.get('reportedAt'))) {
        _createReport();
      }
      else {
        $state.go('app.day-reports');
      }
    }
    else {
      _createReport();
    }
  });
  }

}]);
